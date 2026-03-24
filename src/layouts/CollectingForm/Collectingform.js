import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// Icons: using lucide-react for professional SVG icons
import {
  Save,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  ClipboardList,
  Package,
  Truck,
  Users,
  FileText,
  Clock,
  Square,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = "cdplc_collection_items_v3";
const MOC_OPTIONS = ["PE", "EM", "PM", "ON", "NC", "CA", "SR", "BS", "OR", "CP"];
const STATUS_OPTIONS = ["Pending", "Collected", "Not Available", "Partial"];

// Admin list from the image
const ADMIN_OPTIONS = ["Waruni", "Lakshmi", "Roshni", "Hiran", "Osani", "Rakmal"];

// Chaser list from the image
const CHASER_OPTIONS = ["Mr. Damiya", "Mrs. Kamala", "Mr. Nimal", "Mrs. Priyanka"];

const defaultForm = {
  handlingAdmin: "",
  endUser: "",
  moc: "",
  jobNo: "",
  description: "",
  poNo: "",
  supplierName: "",
  pcNo: "",
  status: "Pending",
  invoiceCollectedBy: "",
  collectedByChaser: "", // Track which chaser collected this item
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getBadgeClasses(status) {
  const map = {
    Collected: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    "Not Available": "bg-red-100 text-red-800",
    Partial: "bg-blue-100 text-blue-800",
  };
  return map[status] ?? "bg-slate-100 text-slate-700";
}

// ─── Animations (injected once) ───────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes cdp-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes cdp-fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes cdp-slideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes cdp-popIn {
    0%   { opacity: 0; transform: scale(0.92) translateY(8px); }
    100% { opacity: 1; transform: scale(1)    translateY(0);   }
  }
  @keyframes cdp-toastIn {
    0%   { opacity: 0; transform: translateY(-8px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  .cdp-fade-in  { animation: cdp-fadeIn  0.5s ease forwards; }
  .cdp-slide-in { animation: cdp-slideIn 0.35s ease forwards; }
  .cdp-pop-in   { animation: cdp-popIn   0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .cdp-toast-in { animation: cdp-toastIn 0.3s ease forwards; }

  .cdp-shimmer-card {
    background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%);
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.8);
    box-shadow: 0 4px 24px rgba(0,74,173,0.06);
    position: relative;
    overflow: hidden;
  }
  .cdp-shimmer-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%);
    background-size: 200% 100%;
    animation: cdp-shimmer 1.8s infinite;
    border-radius: 20px;
  }

  .cdp-dot-bg {
    background-color: #f8faff;
    background-image: radial-gradient(rgba(0,74,173,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .cdp-input:focus { border-color: #004AAD; outline: none; }
  
  @media (max-width: 768px) {
    .cdp-mobile-card {
      margin-bottom: 12px;
    }
  }
`;

function InjectStyles() {
  useEffect(() => {
    if (document.getElementById("cdp-styles")) return;
    const style = document.createElement("style");
    style.id = "cdp-styles";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

// ─── Searchable Select Component ─���──────────────────────────────────────────
function SearchableSelect({ options = [], value, onChange, placeholder = "-- Select --", id }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setOpen((s) => !s);
          setQuery("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setOpen((s) => !s);
            setQuery("");
          }
        }}
        style={{
          ...inputSx,
          background: value ? "#fff" : "#1976d2", // blue background when showing placeholder
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        id={id}
      >
        <div style={{ color: value ? "#0f172a" : "#ffffff", flex: 1 }}>{value || placeholder}</div>
        <div style={{ marginLeft: 8, color: value ? "#64748b" : "#e0f2fe" }}>{open ? "▴" : "▾"}</div>
      </div>

      {open && (
        <div style={{ position: "absolute", left: 0, right: 0, zIndex: 60 }}>
          <div
            style={{
              padding: 8,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 8px 30px rgba(2,6,23,0.12)",
              border: "1px solid rgba(2,6,23,0.06)",
            }}
          >
            <input
              autoFocus
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                marginBottom: 8,
                borderRadius: 8,
                border: "1px solid #e6eefc",
                outline: "none",
                fontSize: 13,
              }}
            />
            <div style={{ maxHeight: 220, overflow: "auto" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 8, color: "#94a3b8" }}>No results</div>
              ) : (
                filtered.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    style={{ padding: "8px 10px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: "#0f172a" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onChange(opt);
                        setOpen(false);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {opt}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Form Field Wrapper ───────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputSx = {
  border: "1.5px solid #e2e8f0",
  borderRadius: 10,
  padding: "9px 12px",
  fontSize: 14,
  outline: "none",
  color: "#1e293b",
  background: "#fff",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
  width: "100%",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DailyCollectionSheet({ role: propRole = "admin" }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get("type");

  // Determine role: query param has highest priority, then prop
  const role = typeParam === "chaser" ? "chaser" : "admin";

  const isChaser = role === "chaser";
  const isAdmin = role === "admin";

  const [view, setView] = useState("list");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);

  // New state for admin and chaser selection
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedChaser, setSelectedChaser] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [filteredItems, setFilteredItems] = useState([]);

  const dateLong = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ── Sample Data ──
  function getSampleItems() {
    return [
      {
        id: "sample-1",
        handlingAdmin: "Waruni",
        endUser: "Mr. John Smith",
        moc: "PE",
        jobNo: "JOB-2024-001",
        description: "Steel plates for hull construction",
        poNo: "PO-2024-0456",
        supplierName: "ABC Steel Suppliers, Colombo",
        pcNo: "PC-789",
        status: "Pending",
        invoiceCollectedBy: "Service No: 12345",
        collected: false,
        date: selectedDate,
      },
      {
        id: "sample-2",
        handlingAdmin: "Lakshmi",
        endUser: "Mrs. Priya Fernando",
        moc: "EM",
        jobNo: "JOB-2024-002",
        description: "Electrical cables and connectors",
        poNo: "PO-2024-0457",
        supplierName: "ElectroTech Ltd, Negombo",
        pcNo: "PC-790",
        status: "Collected",
        invoiceCollectedBy: "Service No: 23456",
        collected: true,
        collectedByChaser: "Mr. Damiya",
        collectedAt: new Date().toISOString(),
        date: selectedDate,
      },
      {
        id: "sample-3",
        handlingAdmin: "Waruni",
        endUser: "Mr. Rajesh Kumar",
        moc: "PM",
        jobNo: "JOB-2024-003",
        description: "Paint and coating materials",
        poNo: "PO-2024-0458",
        supplierName: "Marine Paints Co, Colombo",
        pcNo: "PC-791",
        status: "Partial",
        invoiceCollectedBy: "Service No: 34567",
        collected: false,
        date: selectedDate,
      },
    ];
  }

  // ── Persistence ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedItems = JSON.parse(saved);
        setItems(parsedItems.length > 0 ? parsedItems : getSampleItems());
      } else {
        setItems(getSampleItems());
      }
    } catch {
      setItems(getSampleItems());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Filter items based on selected admin and date
  useEffect(() => {
    let filtered = items;

    // Filter by handlingAdmin
    if (selectedAdmin) {
      filtered = filtered.filter((item) => item.handlingAdmin === selectedAdmin);
    }

    setFilteredItems(filtered);
  }, [items, selectedAdmin, selectedDate]);

  // ── Toast ──
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  // ── CRUD ──
  function handleSubmit() {
    if (!form.description.trim()) {
      showToast("Description is required!", "error");
      return;
    }

    const newItem = {
      ...form,
      id: editId || generateId(),
      collected: false,
      date: selectedDate, // Store the date
      handlingAdmin: selectedAdmin, // Use selected admin
    };

    if (editId) {
      setItems((prev) => prev.map((it) => (it.id === editId ? newItem : it)));
      showToast("Item updated successfully!");
    } else {
      setItems((prev) => [...prev, newItem]);
      showToast("Item added successfully!");
    }

    setForm(defaultForm);
    setEditId(null);
    setView("list");
  }

  function handleEdit(item) {
    if (isChaser) return;
    setForm({ ...item });
    setEditId(item.id);
    setSelectedAdmin(item.handlingAdmin);
    setView("form");
  }

  function handleDelete(id) {
    if (isChaser) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    showToast("Item removed.", "error");
  }

  // Handle collection with chaser tracking
  function handleCollection(itemId, chaserName) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              collected: true,
              collectedByChaser: chaserName,
              collectedAt: new Date().toISOString(),
              status: "Collected",
            }
          : it
      )
    );
    showToast(`Item marked as collected by ${chaserName}!`);
  }

  function handleNew() {
    if (isChaser) return;
    setForm(defaultForm);
    setEditId(null);
    setSelectedAdmin("");
    setView("form");
  }

  // ── Derived stats ──
  const collected = filteredItems.filter((i) => i.collected).length;
  const pending = filteredItems.filter((i) => !i.collected).length;
  const total = filteredItems.length;
  const pct = total ? Math.round((collected / total) * 100) : 0;

  // Group items by chaser who collected them
  const itemsByChaser = filteredItems.reduce((acc, item) => {
    if (item.collected && item.collectedByChaser) {
      if (!acc[item.collectedByChaser]) {
        acc[item.collectedByChaser] = [];
      }
      acc[item.collectedByChaser].push(item);
    }
    return acc;
  }, {});

  // ── Form field definitions ──
  const formFields = [
    ["endUser", "End User (Mr/Mrs)", "text"],
    ["moc", "MOC", "moc"],
    ["jobNo", "Job No", "text"],
    ["description", "Description *", "text"],
    ["poNo", "PO No", "text"],
    ["supplierName", "Supplier Name & Location", "text"],
    ["pcNo", "P/C No", "text"],
    ["status", "Status", "status"],
    ["invoiceCollectedBy", "Invoice Collected Person & Service No", "text"],
  ];

  // If chaser: force list view always (no form)
  useEffect(() => {
    if (isChaser) {
      setView("list");
      setEditId(null);
      setForm(defaultForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChaser]);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="cdp-dot-bg" style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      <InjectStyles />

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div
          className="cdp-toast-in"
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 100,
            background: toast.type === "error"
              ? "linear-gradient(135deg, #ef4444, #dc2626)"
              : "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {toast.type === "error" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.msg}
        </div>
      )}

      {/* ── Scrollable Body ───────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "20px 16px 32px" }}>
        {/* ── Selection Panel (Admin & Chaser & Date) ─────────────────── */}
        <div
          style={{
            background: "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)",
            borderRadius: 16,
            padding: "16px 20px",
            marginBottom: 20,
            boxShadow: "0 4px 20px rgba(0,74,173,0.25)",
          }}
        >
          <div style={{ color: "#fff", marginBottom: 12 }}>
            <div style={{ fontSize: 11, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              COLOMBO DOCKYARD PLC
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <ClipboardList size={18} />
              Daily Collection Detail Sheet
            </div>
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>
              Supplies & Material Control — Local Purchase
            </div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 6 }}>
              {isChaser ? "Role: Chaser (View only, can mark collected)" : "Role: Admin (Full access)"}
            </div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
              {dateLong}
            </div>
          </div>

          {/* Date Picker */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 4 }}>
              <Calendar size={12} style={{ display: "inline", marginRight: 4 }} />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                padding: "8px 12px",
                color: "#fff",
                fontSize: 13,
                width: "100%",
                outline: "none",
              }}
            />
          </div>

          {/* Admin and Chaser selection row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 4 }}>
                <Users size={12} style={{ display: "inline", marginRight: 4 }} />
                Select Admin
              </label>
              <SearchableSelect
                options={ADMIN_OPTIONS}
                value={selectedAdmin}
                onChange={(v) => setSelectedAdmin(v)}
                placeholder="-- Select Admin --"
                id="select-admin-header"
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "block", marginBottom: 4 }}>
                <Truck size={12} style={{ display: "inline", marginRight: 4 }} />
                Select Chaser
              </label>
              <SearchableSelect
                options={CHASER_OPTIONS}
                value={selectedChaser}
                onChange={(v) => setSelectedChaser(v)}
                placeholder="-- Select Chaser --"
                id="select-chaser-header"
              />
            </div>
          </div>

          {/* Chaser count display */}
          {selectedChaser && (
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                color: "#fff",
                textAlign: "center",
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <User size={12} />
              Chaser: {selectedChaser} - Ready for collection
            </div>
          )}

          {/* Progress bar */}
          {selectedAdmin && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                  Collection Progress ({selectedAdmin})
                </span>
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
                  {collected}/{total} ({pct}%)
                </span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 10, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: "#34d399",
                    borderRadius: 10,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Tab Navigation ────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 12,
            padding: 4,
            marginBottom: 16,
            boxShadow: "0 2px 8px rgba(0,74,173,0.06)",
            border: "1px solid rgba(0,74,173,0.06)",
          }}
        >
          {[
            ["list", <><ClipboardList size={14} /> Collection List</>],
            ["form", editId ? <><Edit size={14} /> Edit Item</> : <><Plus size={14} /> Add Item</>],
          ]
            .filter(([v]) => (isChaser ? v === "list" : true))
            .map(([v, label]) => (
              <button
                key={v}
                onClick={() => (v === "form" ? handleNew() : setView("list"))}
                style={{
                  flex: 1,
                  border: "none",
                  padding: "9px 12px",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: view === v ? 700 : 500,
                  background: view === v
                    ? "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)"
                    : "transparent",
                  color: view === v ? "#fff" : "#64748b",
                  boxShadow: view === v ? "0 2px 8px rgba(0,74,173,0.25)" : "none",
                  transition: "all 0.25s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {label}
              </button>
            ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* FORM VIEW                                                        */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {view === "form" && isAdmin && (
          <div className="cdp-pop-in" style={{ opacity: 0 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(0,74,173,0.08)",
                border: "1px solid rgba(0,74,173,0.06)",
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderBottom: "1px solid rgba(0,74,173,0.08)",
                  paddingBottom: 16,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(0,74,173,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  {editId ? <Edit size={18} color="#004AAD" /> : <Plus size={18} color="#004AAD" />}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>
                    {editId ? "Edit Collection Item" : "New Collection Item"}
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>Fill in the details below</div>
                </div>
              </div>

              {/* Admin selection in form */}
              <div style={{ marginBottom: 20 }}>
                <Field label="Handling Admin (Required)">
                  <SearchableSelect
                    options={ADMIN_OPTIONS}
                    value={selectedAdmin}
                    onChange={(v) => setSelectedAdmin(v)}
                    placeholder="-- Select Admin --"
                    id="select-admin-form"
                  />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {formFields.map(([key, label, type]) => (
                  <Field key={key} label={label}>
                    {type === "moc" ? (
                      <SearchableSelect
                        options={MOC_OPTIONS}
                        value={form[key]}
                        onChange={(v) => setForm({ ...form, [key]: v })}
                        placeholder="-- Select --"
                        id={`moc-${key}`}
                      />
                    ) : type === "status" ? (
                      <SearchableSelect
                        options={STATUS_OPTIONS}
                        value={form[key]}
                        onChange={(v) => setForm({ ...form, [key]: v })}
                        placeholder="Select status"
                        id={`status-${key}`}
                      />
                    ) : (
                      <input
                        className="cdp-input"
                        style={inputSx}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={label.replace(" *", "")}
                      />
                    )}
                  </Field>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAdmin}
                  style={{
                    background: selectedAdmin ? "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)" : "#cbd5e1",
                    color: "#fff",
                    border: "none",
                    padding: "10px 24px",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: selectedAdmin ? "pointer" : "not-allowed",
                    boxShadow: selectedAdmin ? "0 4px 12px rgba(0,74,173,0.3)" : "none",
                    transition: "transform 0.15s, box-shadow 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {editId ? (
                    <>
                      <Edit size={14} />
                      Update Item
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save Item
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setView("list");
                    setForm(defaultForm);
                    setEditId(null);
                    setSelectedAdmin("");
                  }}
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 10,
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <XCircle size={14} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* LIST VIEW                                                        */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {view === "list" && (
          <div className="cdp-fade-in" style={{ opacity: 0 }}>
            {filteredItems.length === 0 ? (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "48px 24px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(0,74,173,0.06)",
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 16 }}>📭</div>
                <div style={{ fontSize: 16, color: "#64748b", marginBottom: 8 }}>No collection items found</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20 }}>
                  {selectedAdmin ? `No items for ${selectedAdmin}` : "Add your first collection item to get started"}
                </div>

                {isAdmin && (
                  <button
                    onClick={handleNew}
                    style={{
                      background: "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Plus size={14} />
                    Add First Item
                  </button>
                )}
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  <div>
                    <span style={{ fontSize: 13, color: "#64748b" }}>
                      {selectedAdmin ? (
                        <>
                          Showing items for <strong style={{ color: "#004AAD" }}>{selectedAdmin}</strong>
                        </>
                      ) : (
                        <>Showing all collection items</>
                      )}
                    </span>
                    {selectedChaser && (
                      <span style={{ fontSize: 12, color: "#10b981", marginLeft: 8 }}>
                        • Active chaser: {selectedChaser}
                      </span>
                    )}
                  </div>

                  {isAdmin && (
                    <button
                      onClick={handleNew}
                      style={{
                        background: "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)",
                        color: "#fff",
                        border: "none",
                        padding: "8px 18px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Plus size={14} />
                      Add Item
                    </button>
                  )}
                </div>

                {/* Display items grouped by chaser who collected them */}
                {selectedChaser && Object.keys(itemsByChaser).length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        borderRadius: 12,
                        padding: "12px 16px",
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <CheckCircle2 size={18} color="#fff" />
                      <div>
                        <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Collected by {selectedChaser}</div>
                        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                          {itemsByChaser[selectedChaser]?.length || 0} items collected
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop Table */}
                <div
                  className="hidden md:block"
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,74,173,0.07)",
                    border: "1px solid rgba(0,74,173,0.06)",
                    overflowX: "auto",
                  }}
                >
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 780 }}>
                    <thead>
                      <tr style={{ background: "linear-gradient(135deg, #004AAD 0%, #1d4ed8 100%)" }}>
                        {["#", "✓", "End User", "MOC", "Job No", "Description", "PO No", "Supplier", "Status", ...(isAdmin ? ["Actions"] : [])].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "12px 12px",
                              textAlign: "left",
                              color: "#fff",
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: "0.4px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, idx) => {
                        const rowBg = item.collected ? "rgba(16,185,129,0.04)" : idx % 2 === 0 ? "#fff" : "rgba(0,74,173,0.015)";
                        const isCollectedByCurrentChaser = item.collected && item.collectedByChaser === selectedChaser;
                        return (
                          <tr
                            key={item.id}
                            className="cdp-data-row"
                            style={{ borderBottom: "1px solid rgba(0,74,173,0.06)", background: rowBg }}
                          >
                            <td style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 11 }}>{idx + 1}</td>
                            <td style={{ padding: "10px 12px", textAlign: "center" }}>
                              <button
                                onClick={() => {
                                  if (selectedChaser) {
                                    handleCollection(item.id, selectedChaser);
                                  } else {
                                    showToast("Please select a chaser first!", "error");
                                  }
                                }}
                                disabled={!selectedChaser || item.collected}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: selectedChaser && !item.collected ? "pointer" : "not-allowed",
                                  padding: 0,
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                {item.collected ? (
                                  <CheckCircle2 size={18} color="#10b981" />
                                ) : (
                                  <Square size={18} color={selectedChaser ? "#94a3b8" : "#cbd5e1"} />
                                )}
                              </button>
                            </td>
                            <td style={{ padding: "10px 12px", fontSize: 12, color: "#334155" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <User size={12} color="#64748b" />
                                {item.endUser}
                              </div>
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              {item.moc && (
                                <span
                                  style={{
                                    background: "rgba(0,74,173,0.08)",
                                    color: "#004AAD",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    padding: "2px 8px",
                                    borderRadius: 6,
                                  }}
                                >
                                  {item.moc}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "10px 12px", fontSize: 12, color: "#334155" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <FileText size={11} color="#64748b" />
                                {item.jobNo}
                              </div>
                            </td>
                            <td style={{ padding: "10px 12px", fontWeight: 500, maxWidth: 180 }}>
                              {item.collected ? (
                                <s style={{ color: "#94a3b8", fontSize: 13 }}>{item.description}</s>
                              ) : (
                                <span style={{ color: "#1e293b", fontSize: 13 }}>{item.description}</span>
                              )}
                              {isCollectedByCurrentChaser && (
                                <div style={{ fontSize: 10, color: "#10b981", marginTop: 2 }}>
                                  ✓ Collected by {item.collectedByChaser}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: "10px 12px", fontSize: 12, whiteSpace: "nowrap", color: "#475569" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Package size={11} color="#64748b" />
                                {item.poNo}
                              </div>
                            </td>
                            <td style={{ padding: "10px 12px", fontSize: 12, color: "#475569", maxWidth: 130 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Truck size={11} color="#64748b" />
                                {item.supplierName}
                              </div>
                            </td>
                            <td style={{ padding: "10px 12px" }}>
                              <span
                                className={getBadgeClasses(item.status)}
                                style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}
                              >
                                {item.status === "Collected" && <CheckCircle2 size={10} style={{ display: "inline", marginRight: 4 }} />}
                                {item.status === "Pending" && <Clock size={10} style={{ display: "inline", marginRight: 4 }} />}
                                {item.status === "Not Available" && <AlertCircle size={10} style={{ display: "inline", marginRight: 4 }} />}
                                {item.status}
                              </span>
                            </td>
                            {isAdmin && (
                              <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
                                <>
                                  <button
                                    onClick={() => handleEdit(item)}
                                    title="Edit"
                                    style={{
                                      background: "rgba(0,74,173,0.07)",
                                      border: "none",
                                      borderRadius: 7,
                                      padding: "6px 8px",
                                      cursor: "pointer",
                                      marginRight: 8,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 4,
                                    }}
                                  >
                                    <Edit size={14} color="#004AAD" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    title="Delete"
                                    style={{
                                      background: "rgba(239,68,68,0.07)",
                                      border: "none",
                                      borderRadius: 7,
                                      padding: "6px 8px",
                                      cursor: "pointer",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 4,
                                    }}
                                  >
                                    <Trash2 size={14} color="#ef4444" />
                                  </button>
                                </>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filteredItems.map((item, idx) => {
                    const isCollectedByCurrentChaser = item.collected && item.collectedByChaser === selectedChaser;
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: "#fff",
                          borderRadius: 16,
                          boxShadow: "0 2px 12px rgba(0,74,173,0.07)",
                          border: item.collected ? "1px solid #86efac" : "1px solid rgba(0,74,173,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 16px",
                            background: item.collected ? "rgba(16,185,129,0.06)" : "rgba(0,74,173,0.03)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>#{idx + 1}</span>
                            <button
                              onClick={() => {
                                if (selectedChaser) {
                                  handleCollection(item.id, selectedChaser);
                                } else {
                                  showToast("Please select a chaser first!", "error");
                                }
                              }}
                              disabled={!selectedChaser || item.collected}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: selectedChaser && !item.collected ? "pointer" : "not-allowed",
                                padding: 0,
                                display: "inline-flex",
                              }}
                            >
                              {item.collected ? (
                                <CheckCircle2 size={18} color="#10b981" />
                              ) : (
                                <Square size={18} color={selectedChaser ? "#94a3b8" : "#cbd5e1"} />
                              )}
                            </button>
                            <span className={getBadgeClasses(item.status)} style={{ padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                              {item.status}
                            </span>
                          </div>

                          <div style={{ display: "flex", gap: 8 }}>
                            {isAdmin ? (
                              <>
                                <button onClick={() => handleEdit(item)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                                  <Edit size={16} color="#004AAD" />
                                </button>
                                <button onClick={() => handleDelete(item.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                                  <Trash2 size={16} color="#ef4444" />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>

                        <div style={{ padding: "12px 16px" }}>
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 14,
                              textDecoration: item.collected ? "line-through" : "none",
                              color: item.collected ? "#94a3b8" : "#1e293b",
                              marginBottom: 8,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <FileText size={12} color="#64748b" />
                            {item.description || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No description</span>}
                          </p>

                          {isCollectedByCurrentChaser && (
                            <div
                              style={{
                                fontSize: 11,
                                color: "#10b981",
                                background: "rgba(16,185,129,0.1)",
                                padding: "4px 8px",
                                borderRadius: 6,
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <CheckCircle2 size={12} />
                              Collected by {item.collectedByChaser}
                            </div>
                          )}

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", fontSize: 12, color: "#64748b" }}>
                            {item.endUser && (
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <User size={10} /> <b>End User:</b> {item.endUser}
                              </span>
                            )}
                            {item.moc && (
                              <span>
                                <b>MOC:</b>{" "}
                                <span
                                  style={{
                                    background: "rgba(0,74,173,0.08)",
                                    color: "#004AAD",
                                    fontWeight: 700,
                                    padding: "1px 6px",
                                    borderRadius: 4,
                                    fontSize: 11,
                                  }}
                                >
                                  {item.moc}
                                </span>
                              </span>
                            )}
                            {item.jobNo && (
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <FileText size={10} /> <b>Job No:</b> {item.jobNo}
                              </span>
                            )}
                            {item.poNo && (
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Package size={10} /> <b>PO No:</b> {item.poNo}
                              </span>
                            )}
                            {item.pcNo && <span><b>P/C No:</b> {item.pcNo}</span>}
                            {item.supplierName && (
                              <span style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 4 }}>
                                <Truck size={10} /> <b>Supplier:</b> {item.supplierName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#94a3b8",
            marginTop: 28,
            paddingTop: 16,
            borderTop: "1px solid rgba(0,74,173,0.06)",
          }}
        >
          Form No: 8.4-DMP-FO-13 · Issue: 01 (2010-01-01) · Rev: 02 (2015-10-01) · Generated from CP for Local Purchase 8.4-DMP-CP-02
        </div>
      </div>
    </div>
  );
}
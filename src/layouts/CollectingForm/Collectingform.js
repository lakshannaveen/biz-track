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
  User,
  Calendar,
  ClipboardList,
  Package,
  Truck,
  Users,
  FileText,
  Clock,
  Square,
  Loader2,
} from "lucide-react";

// Services
import CommonService from "../../service/CommonService";

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
  collectedByChaser: "", // Track which chaser collected this item
  remark: "", // Chaser remark (admin view-only)
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
  @keyframes cdp-spin {
    to { transform: rotate(360deg); }
  }
  .cdp-fade-in  { animation: cdp-fadeIn  0.5s ease forwards; }
  .cdp-slide-in { animation: cdp-slideIn 0.35s ease forwards; }
  .cdp-pop-in   { animation: cdp-popIn   0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .cdp-toast-in { animation: cdp-toastIn 0.3s ease forwards; }
  .cdp-spin     { animation: cdp-spin 0.8s linear infinite; }

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
  
  .cdp-header-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
  }

  .cdp-header-meta {
    text-align: right;
    min-width: 140px;
  }
  
  @media (max-width: 768px) {
    .cdp-mobile-card {
      margin-bottom: 12px;
    }
  }

  @media (max-width: 640px) {
    .cdp-header-top-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .cdp-header-meta {
      text-align: left;
      min-width: 0;
      margin-top: 6px;
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

// ─── Searchable Select Component ───────────────────────────────────────────
function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "-- Select --",
  id,
  usePrimaryPlaceholderStyle = true,
  // When true, keep the primary (blue) styling even after a value is selected.
  // Used for the top-card Admin/Chaser selectors only.
  keepPrimaryBackgroundAfterSelect = false,
  // Allow caller to customize the primary background color (top card only)
  primaryBackgroundColor = "#1976d2",
}) {
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

  const isPlaceholder = !value;
  const usePrimary = usePrimaryPlaceholderStyle && (isPlaceholder || keepPrimaryBackgroundAfterSelect);

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
          background: usePrimary ? primaryBackgroundColor : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        id={id}
      >
        <div style={{ color: usePrimary ? "#ffffff" : "#0f172a", flex: 1 }}>{value || placeholder}</div>
        <div style={{ marginLeft: 8, color: usePrimary ? "#e0f2fe" : "#64748b" }}>{open ? "▴" : "▾"}</div>
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
  const [savingRemarkForId, setSavingRemarkForId] = useState(null);
  const savingRemarkTimeout = useRef(null);

  // API data states
  const [poOptions, setPoOptions] = useState([]);
  const [mocOptions, setMocOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [apiData, setApiData] = useState([]);

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
        collected: false,
        remark: "",
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
        collected: true,
        collectedByChaser: "Mr. Damiya",
        collectedAt: new Date().toISOString(),
        remark: "",
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
        collected: false,
        remark: "",
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

  // Fetch TODO list options
  useEffect(() => {
    const fetchToDoList = async () => {
      setLoadingOptions(true);
      try {
        const response = await CommonService.GetToDoList();
        if (response.data && response.data.ResultSet) {
          const data = response.data.ResultSet;
          setApiData(data);
          // Helper to read MOC from various API field names
          const readMoc = (it) => {
            return (
              it.MOCNO ?? it.MOC_NO ?? it.MOCNo ?? it.MOC_no ?? it.MOC ?? it.moc ?? null
            );
          };

          // Extract unique PO Nos
          const uniquePoNos = [...new Set(data.map((item) => item.PO_NO).filter(Boolean))];
          setPoOptions(uniquePoNos);

          // Extract unique MOCs (support multiple API naming variants)
          const uniqueMocs = [...new Set(data.map((item) => String(readMoc(item))).filter((v) => v && v !== 'null'))];
          setMocOptions(uniqueMocs);

          // Extract unique Supplier Names
          const uniqueSuppliers = [...new Set(data.map((item) => item.SUPPLIER_NAME).filter(Boolean))];
          setSupplierOptions(uniqueSuppliers);
        }
      } catch (error) {
        console.error("Error fetching TODO list:", error);
        showToast("Failed to load options from API", "error");
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchToDoList();
  }, []);

  // Auto-fill supplier and moc when poNo changes
  useEffect(() => {
    if (form.poNo && apiData.length > 0) {
      const matchingItem = apiData.find(item => item.PO_NO === form.poNo);
      if (matchingItem) {
        // readMoc helper used above in fetch; replicate here to be safe
        const readMocLocal = (it) => it.MOCNO ?? it.MOC_NO ?? it.MOCNo ?? it.MOC_no ?? it.MOC ?? it.moc ?? null;

        setForm((prev) => ({
          ...prev,
          supplierName: matchingItem.SUPPLIER_NAME || prev.supplierName,
          moc: String(readMocLocal(matchingItem)) || prev.moc,
          // Build Job No from JCAT + JMAIN when available
          jobNo:
            matchingItem.JCAT && matchingItem.JMAIN
              ? `${matchingItem.JCAT}${matchingItem.JMAIN}`
              : prev.jobNo,
        }));
      }
    }
  }, [form.poNo, apiData]);

  // ── Toast ──
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  // ── CRUD ──
  async function handleSubmit() {
    if (!form.description.trim()) {
      showToast("Description is required!", "error");
      return;
    }

    // Preserve existing remark when admin edits; new items start without remark
    let existingRemark = "";
    if (editId) {
      const existingItem = items.find((it) => it.id === editId);
      if (existingItem && existingItem.remark) existingRemark = existingItem.remark;
    }

    const newItem = {
      ...form,
      id: editId || generateId(),
      collected: false,
      date: selectedDate, // Store the date
      handlingAdmin: selectedAdmin, // Use selected admin
      remark: existingRemark,
    };

    // Build payload for API
    const formatDateForApi = (iso) => {
      try {
        const d = new Date(iso);
        const day = String(d.getDate()).padStart(2, "0");
        const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const year = String(d.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
      } catch (e) {
        return iso;
      }
    };

    // Find matching API record for additional fields
    const matchingItem = apiData.find((it) => it.PO_NO === form.poNo) || {};

    const mapStatus = (s) => {
      if (!s) return "P";
      if (s === "Pending") return "P";
      if (s === "Collected") return "C";
      if (s === "Not Available") return "N";
      if (s === "Partial") return "PA";
      return s;
    };

    const payload = {
      P_MDD_DATE: formatDateForApi(selectedDate),
      P_MDD_CHASER_ID: selectedChaser && Number(selectedChaser) ? String(selectedChaser) : "1",
      P_MDD_HANDLE_BY: selectedAdmin || form.handlingAdmin || "",
      P_MDD_REQUEST_BY: localStorage.getItem("ServiceNo") || "",
      P_MDD_MOC_NO: (matchingItem.MOCNO ?? matchingItem.MOC_NO ?? form.moc) || "",
      P_MDD_JCAT: matchingItem.JCAT || "",
      P_MDD_JMAIN: matchingItem.JMAIN || form.jobNo || "",
      P_MDD_DESCRIPTION: form.description || "",
      P_MDD_PO_NO: form.poNo || "",
      P_MDD_SUPPLIER_CODE: matchingItem.SUPPLIER_CODE || "",
      P_MDD_CHASER_REMARK: form.remark || "",
      P_MDD_STATUS: mapStatus(form.status),
      P_MDD_PC_NO: form.pcNo || "",
      P_MDD_INVCOLLECTED_BY: form.collectedByChaser || "",
    };

    // Send to API, but still persist locally on failure
    let apiOk = false;
    try {
      const resp = await CommonService.PostDailyCollect(payload);
      if (resp && resp.data) {
        // Accept common success patterns
        apiOk = true;
        showToast("Saved to server successfully.");
      }
    } catch (err) {
      console.error("PostDailyCollect failed:", err);
      showToast("Failed to save to server — saved locally.", "error");
    }

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

  // Chaser-only: update remark text for a specific item
  function handleRemarkChange(itemId, remarkText) {
    if (!isChaser) return;
    setItems((prev) =>
      prev.map((it) =>
        it.id === itemId
          ? {
              ...it,
              // remove any legacy remarkText field and store under remark
              remarkText: undefined,
              remark: remarkText,
            }
          : it
      )
    );

    // show per-item saving indicator for a short duration
    setSavingRemarkForId(itemId);
    if (savingRemarkTimeout.current) {
      clearTimeout(savingRemarkTimeout.current);
    }
    savingRemarkTimeout.current = setTimeout(() => {
      setSavingRemarkForId(null);
      showToast("Remark auto-saved");
    }, 700);
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
    ["moc", "MOC", "text"],
    ["jobNo", "Job No", "text"],
    ["description", "Description *", "text"],
    ["supplierName", "Supplier Name & Location", "text"],
    ["pcNo", "P/C No", "text"],
    ["status", "Status", "status"],
  ];

  // If chaser: force list view always (no form)
  useEffect(() => {
    if (isChaser) {
      setView("list");
      setEditId(null);
      setForm(defaultForm);
      // In chaser mode we treat the current user as the active chaser
      setSelectedChaser("Chaser");
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
        {isAdmin ? (
          /* ── Header / Summary Card (Admin only) ───────────────────── */
          <div
            style={{
              borderRadius: 18,
              background: "linear-gradient(135deg, #5B52B3 0%, #004AAD 100%)",
              padding: "16px 18px 18px",
              marginBottom: 20,
              boxShadow: "0 10px 30px rgba(15,23,42,0.35)",
              color: "#ffffff",
            }}
          >
            {/* Top row: title + role/date */}
            <div className="cdp-header-top-row">
              <div>
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.8,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  COLOMBO DOCKYARD PLC
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 16,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <ClipboardList size={18} />
                  Daily Collection Detail Sheet
                </div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
                  Supplies & Material Control — Local Purchase
                </div>
              </div>

              <div className="cdp-header-meta">
                <div style={{ fontSize: 11, opacity: 0.7 }}>Today</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{dateLong}</div>
              </div>
            </div>

            {/* Middle row: quick stats */}
            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 8,
              }}
            >
              <div
                style={{
                  background: "rgba(15,23,42,0.18)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                }}
              >
                <ClipboardList size={16} />
                <div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>Total Items</div>
                  <div style={{ fontWeight: 700 }}>{total}</div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(15,23,42,0.18)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                }}
              >
                <Clock size={16} />
                <div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>Pending</div>
                  <div style={{ fontWeight: 700 }}>{pending}</div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(15,23,42,0.18)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                }}
              >
                <CheckCircle2 size={16} />
                <div>
                  <div style={{ fontSize: 10, opacity: 0.8 }}>Collected</div>
                  <div style={{ fontWeight: 700 }}>{collected}</div>
                </div>
              </div>
            </div>

            {/* Bottom row: date + filters */}
            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 10,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  <Calendar size={12} style={{ marginRight: 4 }} />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: 10,
                    padding: "8px 10px",
                    color: "#fff",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  <Users size={12} style={{ marginRight: 4 }} />
                  Select Admin
                </label>
                <SearchableSelect
                  options={ADMIN_OPTIONS}
                  value={selectedAdmin}
                  onChange={(v) => setSelectedAdmin(v)}
                  placeholder="-- Select Admin --"
                  id="select-admin-header"
                  keepPrimaryBackgroundAfterSelect
                  primaryBackgroundColor="#004AAD"
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  <Truck size={12} style={{ marginRight: 4 }} />
                  Select Chaser
                </label>
                <SearchableSelect
                  options={CHASER_OPTIONS}
                  value={selectedChaser}
                  onChange={(v) => setSelectedChaser(v)}
                  placeholder="-- Select Chaser --"
                  id="select-chaser-header"
                  keepPrimaryBackgroundAfterSelect
                  primaryBackgroundColor="#004AAD"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── Compact Date Bar (Chaser only) ───────────────────────── */
          <div
            style={{
              background: "#ffffff",
              borderRadius: 14,
              padding: "10px 14px 12px",
              marginBottom: 16,
              boxShadow: "0 4px 16px rgba(15,23,42,0.12)",
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <label
              style={{
                fontSize: 11,
                color: "#64748b",
                display: "block",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              <Calendar size={12} style={{ marginRight: 4 }} />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                width: "100%",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: "8px 10px",
                color: "#0f172a",
                fontSize: 13,
                outline: "none",
              }}
            />
          </div>
        )}

        {/* ── Tab Navigation (Admin only; chaser always sees list) ─────── */}
        {isAdmin && (
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
            ].map(([v, label]) => (
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
        )}

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

              {/* PO No before Handling Admin */}
              <div style={{ marginBottom: 16 }}>
                <Field label="PO No">
                  <SearchableSelect
                    options={poOptions}
                    value={form.poNo}
                    onChange={(v) => setForm({ ...form, poNo: v })}
                    placeholder={loadingOptions ? "Loading..." : "Select PO No"}
                    id="po-poNo-form"
                    usePrimaryPlaceholderStyle={false}
                  />
                </Field>
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
                    usePrimaryPlaceholderStyle={false}
                  />
                </Field>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                {formFields.map(([key, label, type]) => (
                  <Field key={key} label={label}>
                    {type === "po" ? (
                      <SearchableSelect
                        options={poOptions}
                        value={form[key]}
                        onChange={(v) => setForm({ ...form, [key]: v })}
                        placeholder={loadingOptions ? "Loading..." : "Select PO No"}
                        id={`po-${key}`}
                        usePrimaryPlaceholderStyle={false}
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
                {isAdmin && (
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
                  </div>
                )}

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

                {/* Card list for both admin and chaser views */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                                if (!isChaser) return;
                                if (selectedChaser) {
                                  handleCollection(item.id, selectedChaser);
                                } else {
                                  showToast("Please select a chaser first!", "error");
                                }
                              }}
                              disabled={!isChaser || !selectedChaser || item.collected}
                              style={{
                                background: "none",
                                border: "none",
                                cursor:
                                  isChaser && selectedChaser && !item.collected
                                    ? "pointer"
                                    : "not-allowed",
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

                          {/* Remark: editable for chaser, read-only for admin */}
                          {isChaser ? (
                            <div style={{ marginBottom: 8 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: 4,
                                }}
                              >
                                <div
                                  style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}
                                >
                                  Chaser Remark
                                </div>
                                {savingRemarkForId === item.id && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 4,
                                      fontSize: 11,
                                      color: "#0ea5e9",
                                    }}
                                  >
                                    <Loader2 size={12} className="cdp-spin" />
                                    Saving...
                                  </div>
                                )}
                              </div>
                              <textarea
                                value={item.remark || ""}
                                onChange={(e) => {
                                  handleRemarkChange(item.id, e.target.value);
                                }}
                                placeholder="Type remark (auto-saves)"
                                rows={2}
                                style={{
                                  width: "100%",
                                  resize: "vertical",
                                  fontSize: 12,
                                  padding: "6px 8px",
                                  borderRadius: 8,
                                  border: "1px solid #e2e8f0",
                                  outline: "none",
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                marginBottom: 8,
                                fontSize: 11,
                                color: "#0f172a",
                                background: "#eef2ff",
                                padding: "4px 8px",
                                borderRadius: 6,
                              }}
                            >
                              <b>Remark:</b>{" "}
                              {item.remark && item.remark.trim()
                                ? item.remark
                                : "No remark from chaser"}
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
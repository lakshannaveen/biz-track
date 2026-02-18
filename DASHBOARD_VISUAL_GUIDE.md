# Enhanced HR Dashboard - Visual Layout

## Dashboard Layout Description

The new HR Dashboard follows a professional, modern design with the following structure:

```
┌─────────────────────────────────────────────────────────────────┐
│                         HR Dashboard                              │
│         Overview of your attendance, leave, and performance      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│  👥 ATTENDANCE   │  📅 LEAVE BAL.   │  ⏰ PUNCTUALITY  │  📈 PERFORMANCE  │
│                  │                  │                  │                  │
│      96%         │       15         │      97%         │       A+         │
│   This month     │  Days remaining  │  On-time arrival │  Overall rating  │
│                  │                  │                  │                  │
│  [Green Card]    │  [Blue Card]     │  [Orange Card]   │  [Purple Card]   │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘

┌───────────────────────────────────┬───────────────────────────────────┐
│  Monthly Attendance Overview      │  Leave Balance Distribution       │
│                                   │                                   │
│  ████ Present (Green)             │         ╱───────╲                 │
│  ██   Absent (Red)                │        │    📊   │                │
│  ███  Late (Orange)               │         ╲───────╱                 │
│                                   │                                   │
│  [Bar Chart - 6 months]           │  [Pie Chart - 4 leave types]      │
│  Jan Feb Mar Apr May Jun          │  Annual 45% | Sick 30%            │
│                                   │  Casual 18% | Other 7%            │
└───────────────────────────────────┴───────────────────────────────────┘

┌───────────────────────────────────┬───────────────────────────────────┐
│  Punctuality Trends               │  Leave Request Trends             │
│                                   │                                   │
│  ████████████ On Time (Green)     │  ───── Approved (Green)           │
│  ▓▓▓▓ Late (Orange)               │  - - - Pending (Orange)           │
│                                   │  ····· Rejected (Red)             │
│  [Area Chart - Gradient fill]     │  [Line Chart - 3 lines]           │
│  Shows percentage over 6 months   │  Shows trends over 6 months       │
└───────────────────────────────────┴───────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Quick Insights                                                   │
│                                                                   │
│  ⚫ 100% Attendance Last Week  ⚫ 3 Pending Leave Requests       │
│  ⚫ 15 Days Leave Balance      ⚫ Perfect Punctuality: 7 Days    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Header Section
- **Title**: "HR Dashboard" (32px, bold, dark gray)
- **Subtitle**: "Overview of your attendance, leave, and performance metrics" (14px, light gray)

### 2. Stat Cards Row (4 Cards)
Each card features:
- **Icon**: Material-UI icon in colored box (48x48px)
- **Title**: Small gray text (12px)
- **Value**: Large colored number (36px, bold)
- **Subtitle**: Tiny gray text (11px)
- **Background**: Subtle gradient with matching border
- **Border Radius**: 12px for modern look

Colors:
- Green (#4caf50) - Attendance
- Blue (#1976d2) - Leave Balance
- Orange (#ff9800) - Punctuality
- Purple (#9c27b0) - Performance

### 3. Charts Section (2x2 Grid)

#### Chart 1: Monthly Attendance Overview (Bar Chart)
- **Type**: Grouped bar chart
- **Data**: 6 months (Jan-Jun)
- **Bars**: Present (green), Absent (red), Late (orange)
- **Features**: Rounded bar tops, grid lines, tooltips
- **Height**: 300px

#### Chart 2: Leave Balance Distribution (Pie Chart)
- **Type**: Pie/Donut chart
- **Segments**: 4 leave types with different colors
- **Labels**: Show name and percentage
- **Colors**: Blue, green, orange, purple rotation
- **Height**: 300px

#### Chart 3: Punctuality Trends (Area Chart)
- **Type**: Stacked area chart
- **Data**: On-time % and Late % over 6 months
- **Fill**: Gradient from solid to transparent
- **Lines**: Smooth curves (monotone)
- **Colors**: Green for on-time, orange for late
- **Height**: 300px

#### Chart 4: Leave Request Trends (Line Chart)
- **Type**: Multi-line chart
- **Lines**: Approved (green), Pending (orange), Rejected (red)
- **Points**: Visible dots on data points (r=5)
- **Stroke**: 3px width for clarity
- **Height**: 300px

### 4. Quick Insights Section
- **Background**: White card with subtle border
- **Content**: 4 chips with colored borders
- **Chip colors**: Match card colors (success, warning, primary, info)
- **Border Radius**: 16px for pill shape
- **Font**: 13px, medium weight

## Color Palette

```css
Primary:   #1976d2  (Blue)
Secondary: #dc004e  (Red/Pink)
Success:   #4caf50  (Green)
Warning:   #ff9800  (Orange)
Info:      #2196f3  (Light Blue)
Purple:    #9c27b0  (Purple)
Teal:      #009688  (Teal)
Pink:      #e91e63  (Pink)

Background: #f5f5f5 (Light Gray)
Card BG:    #ffffff (White)
Text:       #333333 (Dark Gray)
Subtext:    #666666 (Medium Gray)
Border:     #e0e0e0 (Very Light Gray)
```

## Responsive Behavior

### Desktop (> 768px)
- Stat cards: 4 columns
- Charts: 2 columns (side by side)
- Full width utilization

### Tablet (768px - 500px)
- Stat cards: 2 columns
- Charts: 2 columns (narrower)
- Adjusted spacing

### Mobile (< 500px)
- Stat cards: 2 columns
- Charts: 1 column (stacked)
- Optimized for portrait view

## Typography

- **Headings (H1)**: 32px, weight 700, color #333
- **Section Titles (H2)**: 18px, weight 600, color #333
- **Body Text**: 14px, weight 400, color #666
- **Stat Values**: 36px, weight 700, colored
- **Stat Labels**: 12px, weight 400, color #666
- **Chart Axes**: 12px, color #666
- **Legends**: 12px, icons: circles

## Spacing System

- **Card Padding**: 24px
- **Grid Gap**: 16px
- **Section Margins**: 24px bottom
- **Icon Size**: 48x48px
- **Border Radius**: 12px (cards), 8px (icons), 16px (chips)

## Interactive Elements

1. **Tooltips**: Appear on chart hover with white background
2. **Chart Animations**: Smooth entrance animations
3. **Loading State**: Centered circular progress indicator
4. **Responsive**: Touch-friendly on mobile devices

## Accessibility

- Semantic HTML structure
- Color contrast ratios meet WCAG AA standards
- Screen reader friendly labels
- Keyboard navigable
- ARIA labels on interactive elements

This design provides a modern, professional dashboard that matches enterprise HR software standards while maintaining the project's existing design language.

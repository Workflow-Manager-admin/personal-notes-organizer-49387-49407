import React from "react";

/**
 * Top navigation bar that shows user info, logout, and hamburger for sidebar.
 * Props:
 *  - user: logged-in user object
 *  - onLogout: logout callback
 *  - sidebarOpen: state of sidebar visibility
 *  - setSidebarOpen: function to open sidebar
 */
// PUBLIC_INTERFACE
function TopNav({ user, onLogout, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="top-nav">
      <button
        className="sidebar-toggle"
        aria-label="Open sidebar"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        {sidebarOpen ? "☰" : "☰"}
      </button>
      <div className="top-nav-title">Personal Notes Organizer</div>
      <div className="top-nav-actions">
        <span className="top-nav-user">
          {user.email}
        </span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopNav;

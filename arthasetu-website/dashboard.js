/**
 * DASHBOARD.JS
 * User dashboard functionality and profile management
 * Works with auth.js for user management
 */

class Dashboard {
    constructor() {
        this.user = auth.getCurrentUser();
        this.init();
    }

    init() {
        if (!this.user) {
            window.location.href = 'index.html';
            return;
        }
        
        this.renderDashboard();
        this.setupEventListeners();
    }

    renderDashboard() {
        const container = document.getElementById('dashboardContainer');
        if (!container) return;

        const funds = auth.getSavedFunds();
        const portfolio = auth.getPortfolioData();

        let html = `
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Welcome, ${this.user.name}! 👋</h1>
                    <p>Manage your investments and financial goals</p>
                </div>

                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3>📊 Saved Funds</h3>
                        <p class="stat">${funds.length}</p>
                        <p class="desc">Funds in your watchlist</p>
                        <a href="fund-choosing.html" class="btn-small">View Funds</a>
                    </div>

                    <div class="dashboard-card">
                        <h3>💼 Portfolio</h3>
                        <p class="stat">${portfolio ? '✓' : '○'}</p>
                        <p class="desc">Portfolio configured</p>
                        <a href="portfolio-management.html" class="btn-small">Manage</a>
                    </div>

                    <div class="dashboard-card">
                        <h3>🎯 Wealth Plan</h3>
                        <p class="stat">Ready</p>
                        <p class="desc">Create your wealth strategy</p>
                        <a href="wealth-strategy.html" class="btn-small">Plan</a>
                    </div>

                    <div class="dashboard-card">
                        <h3>👤 Profile</h3>
                        <p class="stat">${this.user.email}</p>
                        <p class="desc">Account settings</p>
                        <button class="btn-small" onclick="dashboard.showProfileModal()">Edit</button>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h2>Recent Activity</h2>
                    ${this.getRecentActivity()}
                </div>

                <div class="dashboard-section">
                    <h2>Quick Actions</h2>
                    <div class="actions-grid">
                        <a href="fund-choosing.html" class="action-btn">
                            <span class="icon">💡</span>
                            <span class="text">Add Funds</span>
                        </a>
                        <a href="portfolio-management.html" class="action-btn">
                            <span class="icon">📊</span>
                            <span class="text">Review Portfolio</span>
                        </a>
                        <a href="wealth-strategy.html" class="action-btn">
                            <span class="icon">🎯</span>
                            <span class="text">Calculate SIP</span>
                        </a>
                        <button class="action-btn" onclick="dashboard.exportUserData()">
                            <span class="icon">📥</span>
                            <span class="text">Export Data</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    getRecentActivity() {
        const funds = auth.getSavedFunds();
        
        if (funds.length === 0) {
            return '<p class="empty-state">No activity yet. Start by adding funds!</p>';
        }

        let html = '<ul class="activity-list">';
        funds.slice(-5).reverse().forEach(fund => {
            html += `<li>✓ Added fund: <strong>${fund.name}</strong> (Score: ${fund.score}/100)</li>`;
        });
        html += '</ul>';
        
        return html;
    }

    setupEventListeners() {
        // Setup any additional event listeners
    }

    showProfileModal() {
        const name = prompt('Enter your name:', this.user.name);
        if (name && name.trim()) {
            const result = auth.updateProfile(name.trim());
            if (result.success) {
                this.user = result.user;
                alert('Profile updated successfully!');
                this.renderDashboard();
            }
        }
    }

    exportUserData() {
        const result = auth.exportData();
        if (result.success) {
            const dataStr = JSON.stringify(result.data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `arthasetu_data_${new Date().toISOString()}.json`;
            link.click();
            alert('Data exported successfully!');
        }
    }
}

// Initialize on load
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new Dashboard();
});
/**
 * ARTHASETU AUTHENTICATION SYSTEM
 * 
 * This system uses localStorage for client-side user management.
 * Perfect for static Vercel deployment.
 * 
 * Data Structure:
 * - arthasetu_users: Array of user objects { name, email, password, createdAt }
 * - arthasetu_user: Current logged-in user { name, email, type }
 * - arthasetu_settings: App settings { theme, notifications }
 */

class AuthManager {
    constructor() {
        this.USERS_KEY = 'arthasetu_users';
        this.CURRENT_USER_KEY = 'arthasetu_user';
        this.SETTINGS_KEY = 'arthasetu_settings';
        this.currentUser = this.loadCurrentUser();
    }

    /**
     * Initialize localStorage with demo data (first time only)
     */
    initializeDemoData() {
        const existing = localStorage.getItem(this.USERS_KEY);
        if (!existing) {
            const demoUsers = [
                {
                    name: 'Rakesh',
                    email: 'rakesh@arthasetu.com',
                    password: 'demo123',
                    createdAt: new Date(2025, 0, 1).toISOString(),
                    type: 'user'
                }
            ];
            localStorage.setItem(this.USERS_KEY, JSON.stringify(demoUsers));
        }
    }

    /**
     * Create a new user account
     */
    signup(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, error: 'All fields required' };
        }

        const users = this.getAllUsers();
        
        if (users.some(u => u.email === email)) {
            return { success: false, error: 'Email already registered' };
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be 6+ characters' };
        }

        const newUser = {
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            type: 'user'
        };

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        return { success: true, user: { name, email, type: 'user' } };
    }

    /**
     * Login user
     */
    login(email, password) {
        if (!email || !password) {
            return { success: false, error: 'Email and password required' };
        }

        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        const sessionUser = {
            name: user.name,
            email: user.email,
            type: 'user',
            loginTime: new Date().toISOString()
        };

        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(sessionUser));
        this.currentUser = sessionUser;

        return { success: true, user: sessionUser };
    }

    /**
     * Logout current user
     */
    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        this.currentUser = null;
        return { success: true };
    }

    /**
     * Get all users (admin only - don't expose to frontend)
     */
    getAllUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    /**
     * Load current user from storage
     */
    loadCurrentUser() {
        try {
            const stored = localStorage.getItem(this.CURRENT_USER_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!this.currentUser;
    }

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Update user profile
     */
    updateProfile(name) {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.email === this.currentUser.email);

        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        users[userIndex].name = name;
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        this.currentUser.name = name;
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));

        return { success: true, user: this.currentUser };
    }

    /**
     * Change password
     */
    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const user = users.find(u => u.email === this.currentUser.email);

        if (!user || user.password !== currentPassword) {
            return { success: false, error: 'Current password incorrect' };
        }

        if (newPassword.length < 6) {
            return { success: false, error: 'Password must be 6+ characters' };
        }

        user.password = newPassword;
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        return { success: true, message: 'Password changed successfully' };
    }

    /**
     * Delete account
     */
    deleteAccount(password) {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.email === this.currentUser.email);

        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        if (users[userIndex].password !== password) {
            return { success: false, error: 'Password incorrect' };
        }

        users.splice(userIndex, 1);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        localStorage.removeItem(this.CURRENT_USER_KEY);
        this.currentUser = null;

        return { success: true, message: 'Account deleted' };
    }

    /**
     * Save app settings
     */
    saveSettings(settings) {
        const current = this.getSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updated));
        return updated;
    }

    /**
     * Get app settings
     */
    getSettings() {
        try {
            return JSON.parse(localStorage.getItem(this.SETTINGS_KEY) || '{}');
        } catch (e) {
            return {};
        }
    }

    /**
     * Save user portfolio data (for each logged-in user)
     */
    savePortfolioData(portfolioData) {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const key = `arthasetu_portfolio_${this.currentUser.email}`;
        localStorage.setItem(key, JSON.stringify({
            data: portfolioData,
            savedAt: new Date().toISOString()
        }));

        return { success: true };
    }

    /**
     * Get user portfolio data
     */
    getPortfolioData() {
        if (!this.currentUser) {
            return null;
        }

        const key = `arthasetu_portfolio_${this.currentUser.email}`;
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored).data : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Save fund recommendations
     */
    saveFundRecommendations(funds) {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const key = `arthasetu_funds_${this.currentUser.email}`;
        localStorage.setItem(key, JSON.stringify({
            funds: funds,
            savedAt: new Date().toISOString()
        }));

        return { success: true };
    }

    /**
     * Get saved funds
     */
    getSavedFunds() {
        if (!this.currentUser) {
            return [];
        }

        const key = `arthasetu_funds_${this.currentUser.email}`;
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored).funds : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Clear all user data (CAUTION: Testing only)
     */
    clearAllData() {
        localStorage.clear();
        this.currentUser = null;
        this.initializeDemoData();
        return { success: true };
    }

    /**
     * Export user data as JSON (for backup)
     */
    exportData() {
        if (!this.currentUser) {
            return { success: false, error: 'Not logged in' };
        }

        const funds = this.getSavedFunds();
        const portfolio = this.getPortfolioData();

        const data = {
            user: this.currentUser,
            portfolio: portfolio,
            funds: funds,
            exportedAt: new Date().toISOString()
        };

        return { success: true, data };
    }
}

// Global instance
const auth = new AuthManager();
auth.initializeDemoData();

// Make available globally
if (typeof window !== 'undefined') {
    window.AuthManager = AuthManager;
    window.auth = auth;
}

// For Node.js/SSR (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
/**
 * UTILS.JS
 * Utility functions for calculations, formatting, and helpers
 */

class Utils {
    /**
     * Format currency in Indian Rupees
     */
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Format large numbers with commas
     */
    static formatNumber(num) {
        return num.toLocaleString('en-IN', {
            maximumFractionDigits: 0
        });
    }

    /**
     * Format percentage
     */
    static formatPercent(num, decimals = 2) {
        return (num).toFixed(decimals) + '%';
    }

    /**
     * Calculate compound interest
     * Principal × (1 + Rate)^Years
     */
    static calculateCI(principal, rate, years) {
        const rateDecimal = rate / 100;
        return principal * Math.pow(1 + rateDecimal, years);
    }

    /**
     * Calculate SIP Future Value (Forward)
     */
    static calculateSIPFuture(sip, years, annualRate) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        const fv = sip * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
        return {
            futureValue: fv,
            principal: sip * months,
            gains: fv - (sip * months)
        };
    }

    /**
     * Calculate Required SIP (Reverse)
     */
    static calculateSIPReverse(goal, years, annualRate) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        const sip = goal / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate));
        return {
            monthlySIP: sip,
            totalInvested: sip * months,
            gains: goal - (sip * months)
        };
    }

    /**
     * Calculate CAGR
     */
    static calculateCAGR(startValue, endValue, years) {
        return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
    }

    /**
     * Validate email
     */
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Validate password (min 6 chars)
     */
    static isValidPassword(password) {
        return password && password.length >= 6;
    }

    /**
     * Get asset allocation by risk profile
     */
    static getAssetAllocation(riskProfile) {
        const allocations = {
            'conservative': { equity: 25, debt: 70, cash: 5 },
            'moderate': { equity: 55, debt: 35, cash: 10 },
            'growth': { equity: 75, debt: 20, cash: 5 },
            'aggressive': { equity: 90, debt: 8, cash: 2 }
        };
        return allocations[riskProfile.toLowerCase()] || allocations['moderate'];
    }

    /**
     * Calculate portfolio value
     */
    static calculatePortfolioValue(holdings) {
        return holdings.reduce((sum, holding) => sum + (holding.quantity * holding.price), 0);
    }

    /**
     * Calculate portfolio allocation percentage
     */
    static calculateAllocationPercent(value, total) {
        return ((value / total) * 100).toFixed(2);
    }

    /**
     * Score fund based on metrics (0-100)
     */
    static scoreFund(metrics) {
        let score = 0;

        // ER scoring (lower is better) - 0-25
        if (metrics.er <= 0.5) score += 25;
        else if (metrics.er <= 1.0) score += 20;
        else if (metrics.er <= 1.5) score += 15;
        else score += 10;

        // Alpha scoring (higher is better) - 0-25
        if (metrics.alpha >= 3) score += 25;
        else if (metrics.alpha >= 2) score += 20;
        else if (metrics.alpha >= 1) score += 15;
        else if (metrics.alpha >= 0) score += 10;
        else score += 5;

        // Sharpe Ratio scoring - 0-25
        if (metrics.sharpe >= 2.0) score += 25;
        else if (metrics.sharpe >= 1.5) score += 20;
        else if (metrics.sharpe >= 1.0) score += 15;
        else score += 10;

        // CAGR scoring - 0-25
        if (metrics.cagr >= 18) score += 25;
        else if (metrics.cagr >= 15) score += 20;
        else if (metrics.cagr >= 12) score += 15;
        else score += 10;

        return Math.round(score);
    }

    /**
     * Get score category
     */
    static getScoreCategory(score) {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Average';
        return 'Poor';
    }

    /**
     * Get score color class
     */
    static getScoreColor(score) {
        if (score >= 80) return 'score-high';
        if (score >= 60) return 'score-mid';
        return 'score-low';
    }

    /**
     * Generate unique ID
     */
    static generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Debounce function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Deep copy object
     */
    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Get today's date formatted
     */
    static getTodayFormatted() {
        return new Date().toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Calculate days between two dates
     */
    static daysBetween(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((date1 - date2) / oneDay));
    }

    /**
     * Show notification
     */
    static showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * Validate form inputs
     */
    static validateFormInputs(inputs) {
        const errors = {};
        
        for (const [key, value] of Object.entries(inputs)) {
            if (!value || value.toString().trim() === '') {
                errors[key] = 'This field is required';
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

// Make available globally
if (typeof window !== 'undefined') {
    window.Utils = Utils;
}

// For Node.js/SSR
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
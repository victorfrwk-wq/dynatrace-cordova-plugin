#!/usr/bin/env node

/**
 * Capacitor Hook - Pre-sync initialization
 * This hook runs before capacitor sync to ensure proper configuration
 * Triggered: before capacitor sync
 */

const fs = require('fs');
const path = require('path');

const InstallHelper = require('../helpers/InstallHelper');
const Logger = require('../logger/Logger');

class CapacitorSync {
  constructor() {
    this.logger = new Logger();
    this.installHelper = new InstallHelper();
  }

  /**
   * Main execution method
   */
  async run() {
    try {
      this.logger.info('Preparing for Capacitor sync...');

      // Ensure dynatrace.config.js exists
      const configPath = path.join(process.cwd(), 'dynatrace.config.js');
      if (!fs.existsSync(configPath)) {
        this.logger.warn('dynatrace.config.js not found. Using defaults.');
      }

      // Verify Capacitor configuration
      await this.verifyCapacitorConfig();

      this.logger.info('Capacitor sync preparation completed.');
    } catch (error) {
      this.logger.error(`Capacitor sync preparation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify Capacitor configuration exists and is valid
   */
  async verifyCapacitorConfig() {
    const capacitorConfigPath = path.join(process.cwd(), 'capacitor.config.json');
    
    if (!fs.existsSync(capacitorConfigPath)) {
      this.logger.warn('capacitor.config.json not found. Capacitor may not be properly initialized.');
      return;
    }

    try {
      const config = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
      this.logger.info(`Capacitor app ID: ${config.appId}`);
    } catch (error) {
      this.logger.error(`Invalid capacitor.config.json: ${error.message}`);
      throw error;
    }
  }
}

// Export for programmatic use
module.exports = CapacitorSync;

// Handle direct execution
if (require.main === module) {
  const sync = new CapacitorSync();
  sync.run().catch((error) => {
    process.exit(1);
  });
}

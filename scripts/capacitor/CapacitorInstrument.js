#!/usr/bin/env node

/**
 * Capacitor Hook - Dynatrace Instrumentation
 * This hook instruments the application for Dynatrace monitoring on Capacitor.
 * Triggered: after capacitor sync and capacitor run/build
 */

const fs = require('fs');
const path = require('path');

const InstrumentHelper = require('../helpers/InstrumentHelper');
const InstallHelper = require('../helpers/InstallHelper');
const Logger = require('../logger/Logger');
const LogLevel = require('../logger/LogLevel');

class CapacitorInstrument {
  constructor() {
    this.logger = new Logger();
    this.instrumentHelper = new InstrumentHelper();
    this.installHelper = new InstallHelper();
  }

  /**
   * Main execution method for Capacitor instrumentation
   */
  async run(context) {
    try {
      this.logger.info('Starting Dynatrace Capacitor instrumentation...');

      // Get configuration
      const config = this.installHelper.getDynatraceConfig();
      
      if (!config) {
        this.logger.warn('Dynatrace configuration not found. Skipping instrumentation.');
        return;
      }

      // Determine platform from context or environment
      const platform = this.determinePlatform(context);
      
      if (!platform) {
        this.logger.warn('Platform could not be determined. Skipping instrumentation.');
        return;
      }

      this.logger.info(`Instrumenting for platform: ${platform}`);

      // Perform instrumentation based on platform
      if (platform === 'ios') {
        await this.instrumentIOS(config);
      } else if (platform === 'android') {
        await this.instrumentAndroid(config);
      }

      this.logger.info('Dynatrace Capacitor instrumentation completed successfully.');
    } catch (error) {
      this.logger.error(`Dynatrace instrumentation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Instrument iOS application for Dynatrace
   */
  async instrumentIOS(config) {
    try {
      this.logger.info('Instrumenting iOS application...');
      
      // iOS instrumentation using the existing instrument helper
      await this.instrumentHelper.instrumentiOS(config);
      
      this.logger.info('iOS instrumentation completed.');
    } catch (error) {
      this.logger.error(`iOS instrumentation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Instrument Android application for Dynatrace
   */
  async instrumentAndroid(config) {
    try {
      this.logger.info('Instrumenting Android application...');
      
      // Android instrumentation using the existing instrument helper
      await this.instrumentHelper.instrumentAndroid(config);
      
      this.logger.info('Android instrumentation completed.');
    } catch (error) {
      this.logger.error(`Android instrumentation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Determine the platform from Capacitor context or environment variables
   */
  determinePlatform(context) {
    // Check context first (passed from Capacitor hook)
    if (context && context.platform) {
      return context.platform;
    }

    // Check environment variables
    if (process.env.CAPACITOR_PLATFORM) {
      return process.env.CAPACITOR_PLATFORM;
    }

    // Check command line arguments
    const args = process.argv.slice(2);
    if (args.includes('ios')) return 'ios';
    if (args.includes('android')) return 'android';

    // Try to detect from capacitor.config.json
    try {
      const capacitorConfigPath = path.join(process.cwd(), 'capacitor.config.json');
      if (fs.existsSync(capacitorConfigPath)) {
        // Default platform from config
        const capacitorConfig = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
        return capacitorConfig.defaultPlatform || null;
      }
    } catch (error) {
      // Silent fail, will return null
    }

    return null;
  }
}

// Export for programmatic use
module.exports = CapacitorInstrument;

// Handle direct execution
if (require.main === module) {
  const instrument = new CapacitorInstrument();
  const context = {
    platform: process.argv[2] || null
  };
  
  instrument.run(context).catch((error) => {
    process.exit(1);
  });
}

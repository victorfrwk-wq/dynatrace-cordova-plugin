module.exports = {
    cordova : {
        debug : false,
        autoUpdate : true,
        cspURL: "https://tha19564.live.dynatrace.com"
    },

    js : {
        url : "https://tha19564.live.dynatrace.com/api/v1/rum/jsInlineScript/APPLICATION-1A68E8CAA3A154C1?Api-Token=<YOUR_DYNATRACE_API_TOKEN>",
    },

    android : {
        // Those configs are copied 1:1
        config : `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId '244915ad-72ea-4508-b1bb-2089e626a6f0'
                        beaconUrl 'https://bf76574zti.bf.dynatrace.com/mbeacon'
                    }
                    hybridWebView {
                        enabled true
                    }
                    agentBehavior.startupLoadBalancing true
                    agentBehavior.startupWithGrailEnabled true
                }
            }
        }
        `
    },

    ios : {
        // Those configs are copied 1:1
        config : `
        <key>DTXApplicationID</key>
        <string>244915ad-72ea-4508-b1bb-2089e626a6f0</string>
        <key>DTXBeaconURL</key>
        <string>https://bf76574zti.bf.dynatrace.com/mbeacon</string>
        <key>DTXHybridApplication</key>
        <string>true</string>
        <key>DTXStartupLoadBalancing</key>
        <true/>
        <key>DTXStartupWithGrailEnabled</key>
        <true/>
        `
    }
}

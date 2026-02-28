Pod::Spec.new do |s|
  s.name = 'DynatraceCordovaPlugin'
  s.version = '2.309.1'
  s.summary = 'Dynatrace Cordova Plugin wrapper for OutSystems'
  s.description = 'Dynatrace Cordova Plugin wrapper for OutSystems'
  s.license = { :type => 'Commercial' }
  s.homepage = 'https://www.dynatrace.com/'
  s.authors = { 'Dynatrace' => 'opensource@dynatrace.com' }
  s.source = { :git => 'https://github.com/OutSystems/dynatrace-cordova-plugin.git', :tag => s.version.to_s }
  s.platform = :ios, '13.0'
  s.source_files = 'other/**/*.{h,m}'
  s.vendored_frameworks = 'files/iOS/Dynatrace.xcframework'
  s.frameworks = 'CoreLocation', 'CoreTelephony', 'Security', 'SystemConfiguration', 'MessageUI', 'WebKit'
  s.libraries = 'sqlite3', 'z', 'c++'
  s.dependency 'CapacitorCordova'
end

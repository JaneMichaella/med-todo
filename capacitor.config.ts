import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medtodo.app',
  appName: '药物清单',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

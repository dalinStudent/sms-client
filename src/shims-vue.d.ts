import { ComponentCustomProperties } from 'vue';
import { Store } from 'pinia';
import { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $axios: AxiosInstance;
  }
}
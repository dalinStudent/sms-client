import { defineStore } from "pinia";
import axios from "axios";
import type { Auth } from "@/common/interface/auth.interface";
import messageBoxUtil from "@/utils/message-box.util";

interface AuthState {
  authData: string | null;
  profileData: Auth | null;
  loading: boolean;
  error: any;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    authData: localStorage.getItem("sms-auth-data") as string,
    profileData: null,
    loading: false,
    error: null as any,
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      this.loading = true;
      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
          email,
          password,
        });
    
        if (response.data.status.code === 0) {
          const res = response.data.data;
    
          this.authData = res.access_token;
          this.profileData = res.user;
    
          localStorage.setItem("sms-auth-data", this.authData as string);
        }
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },    

    async fetchProfile() {
      if (!this.authData) return;

      try {
        const res = await axios.get("http://localhost:8080/auth/profile", {
          headers: { Authorization: `Bearer ${this.authData}` },
        });

        this.profileData = res.data;
        console.log('profile data', this.profileData)
      } catch (err) {
        messageBoxUtil.error("Session expired. Please log in again.");
        this.logout();
      }
    },

    logout(): void {
      this.loading = true;
      try {
        this.authData = null;
        this.profileData = null;
        localStorage.removeItem("sms-auth-data");
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});

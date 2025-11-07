// src/stores/auth.ts
import { defineStore } from "pinia";
import axios from "axios";
import type { Auth } from "@/common/interface/auth.interface";

interface AuthState {
  token: string;
  user: Auth | null;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token") || "",
    user: null,
    loading: false,
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const res = await axios.post("http://localhost:8080/auth/login", {
          email,
          password,
        });
        this.token = res.data.access_token;
        this.user = res.data.user;
        localStorage.setItem("token", this.token);
        return res.data;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});

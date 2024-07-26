import { reactive } from "vue";
import { useRouter } from "vue-router";

const state = reactive({
  isAuthenticated: !!localStorage.getItem("token"),
});

const router = useRouter();

const login = (token) => {
  localStorage.setItem("token", token);
  state.isAuthenticated = true;
};

const logout = () => {
  localStorage.removeItem("token");
  state.isAuthenticated = false;
  // Use a timeout to ensure the state is updated before routing
  setTimeout(() => router.push("/login"), 0);
};

const useAuth = () => {
  return { state, login, logout };
};

export default useAuth;

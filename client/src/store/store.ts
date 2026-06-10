import { configureStore } from "@reduxjs/toolkit";
import ProjectsReducer from "../features/projects/projects.slice"
import AuthReducer from "../features/auth/auth.slice"
import CategoryReducer from "../features/category/category.slice"
import ProposalReducer from "../features/proposal/proposal.slice"
import ContractReducer from "../features/contract/contract.slice"
import PortfolioReducer from "../features/portfolio/portfolio.slice"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        projects: ProjectsReducer,
        auth: AuthReducer,
        category: CategoryReducer,
        proposal: ProposalReducer,
        contract: ContractReducer,
        portfolio: PortfolioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
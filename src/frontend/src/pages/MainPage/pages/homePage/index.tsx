import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import PaginatorComponent from "@/components/common/paginatorComponent";
import CardsWrapComponent from "@/components/core/cardsWrapComponent";
import { useStartNewFlow } from "@/components/core/flowBuilderWelcome/hooks/use-start-new-flow";
import { IS_MAC } from "@/constants/constants";
import { useGetFolderQuery } from "@/controllers/API/queries/folders/use-get-folder";
import { CustomBanner } from "@/customization/components/custom-banner";
import { CustomMcpServerTab } from "@/customization/components/custom-McpServerTab";
import {
  ENABLE_DATASTAX_LANGFLOW,
  ENABLE_MCP,
} from "@/customization/feature-flags";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import { useFolderStore } from "@/stores/foldersStore";
import HeaderComponent from "../../components/header";
import ListComponent from "../../components/list";
import ListSkeleton from "../../components/listSkeleton";
import ModalsComponent from "../../components/modalsComponent";
import useFileDrop from "../../hooks/use-on-file-drop";
import type { FlowTabType } from "../../types";
import DeploymentsPage from "../deploymentsPage/deployments-page";
import EmptyFolder from "../emptyFolder";
import { isFolderEmpty } from "./utils/isFolderEmpty";

const HomePage = ({ type }: { type: "flows" | "components" | "mcp" }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<"grid" | "list">(() => {
    const savedView = localStorage.getItem("view");
    return savedView === "grid" || savedView === "list" ? savedView : "list";
  });
  const [newProjectModal, setNewProjectModal] = useState(false);
  const { folderId } = useParams();
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const [isEmptyFolder, setIsEmptyFolder] = useState<boolean | null>(null);
  const navigate = useCustomNavigate();

  const [flowType, setFlowType] = useState<FlowTabType>(
    (location.state as Record<string, unknown>)?.flowType === "deployments"
      ? "deployments"
      : type,
  );
  const myCollectionId = useFolderStore((state) => state.myCollectionId);
  const folders = useFolderStore((state) => state.folders);
  const folderName =
    folders.find((folder) => folder.id === folderId)?.name ??
    folders[0]?.name ??
    "";
  const flows = useFlowsManagerStore((state) => state.flows);
  // The primary "New Flow" handler — creates an empty flow, primes the
  // welcome overlay store, and navigates to the canvas. Replaces the old
  // "open the templates modal" behavior. The templates modal is still
  // reachable from inside the welcome via "Browse more templates".
  const startNewFlow = useStartNewFlow();

  const workspaceCards = [
    {
      title: "New Workflow",
      description: "Build a new visual AI workflow",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      ),
      bg: "from-purple-500/10 via-purple-500/4 to-transparent hover:from-purple-500/20 hover:via-purple-500/10",
      action: () => startNewFlow(),
    },
    {
      title: "AI Research",
      description: "Analyze data and search the web",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan-400"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      ),
      bg: "from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/20 hover:via-cyan-500/10",
      action: () => startNewFlow(),
    },
    {
      title: "Multi-Agent Studio",
      description: "Create collaborative multi-agent teams",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-400"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
      bg: "from-purple-500/10 via-purple-500/4 to-transparent hover:from-purple-500/20 hover:via-purple-500/10",
      action: () => {
        setFlowType("flows");
        navigate("/all");
      },
    },
    {
      title: "Knowledge Base",
      description: "Manage vector databases & variables",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan-400"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
      ),
      bg: "from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/20 hover:via-cyan-500/10",
      action: () => navigate("/settings/global-variables"),
    },
    {
      title: "Prompt Library",
      description: "Store and customize prompt templates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-400"><path d="M9.937 15.51a1.18 1.18 0 0 0 1.966 0l.79-1.206a2.1 2.1 0 0 1 1.543-.993l1.383-.17a1.17 1.17 0 0 0 .807-1.78l-.888-1.127a2.12 2.12 0 0 1-.41-1.785l.29-1.391a1.18 1.18 0 0 0-1.41-1.378l-1.343.34a2.1 2.1 0 0 1-1.711-.371l-1.11-.795a1.17 1.17 0 0 0-1.802.753l-.33 1.38a2.11 2.11 0 0 1-1.102 1.536l-1.25.688a1.18 1.18 0 0 0-.29 1.838l.983 1.066a2.12 2.12 0 0 1 .53 1.764l-.19 1.383a1.17 1.17 0 0 0 1.25 1.282l1.388-.117a2.1 2.1 0 0 1 1.636.567l1.01 1.05z"/><path d="M19 8.5h2M20 7.5v2M18 16.5h2M19 15.5v2"/></svg>
      ),
      bg: "from-purple-500/10 via-purple-500/4 to-transparent hover:from-purple-500/20 hover:via-purple-500/10",
      action: () => setFlowType("components"),
    },
    {
      title: "Documents",
      description: "Upload and parse source document files",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      ),
      bg: "from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/20 hover:via-cyan-500/10",
      action: () => navigate("/assets/files"),
    },
    {
      title: "MCP Servers",
      description: "Expose flows as Model Context tools",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-400"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
      ),
      bg: "from-purple-500/10 via-purple-500/4 to-transparent hover:from-purple-500/20 hover:via-purple-500/10",
      action: () => setFlowType("mcp"),
    },
    {
      title: "API Keys",
      description: "Configure secret keys & access tokens",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-cyan-400"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
      ),
      bg: "from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/20 hover:via-cyan-500/10",
      action: () => navigate("/settings/api-keys"),
    },
    {
      title: "Settings",
      description: "Adjust general options and preferences",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-400"><path d="M20 7h-9M14 17H5M17 12H7M2 12h1M21 12h1M2 7h1M2 17h1M17 5v4M9 15v4M13 10v4"/></svg>
      ),
      bg: "from-purple-500/10 via-purple-500/4 to-transparent hover:from-purple-500/20 hover:via-purple-500/10",
      action: () => navigate("/settings/general"),
    },
  ];

  useEffect(() => {
    // Only check if we have a folderId and folders have loaded
    if (folderId && folders && folders.length > 0) {
      const folderExists = folders.find((folder) => folder.id === folderId);
      if (!folderExists) {
        // Folder doesn't exist for this user, redirect to /all
        console.error("Invalid folderId, redirecting to /all");
        navigate("/all");
      }
    }
  }, [folderId, folders, navigate]);

  const { data: folderData, isLoading } = useGetFolderQuery({
    id: folderId ?? myCollectionId!,
    page: pageIndex,
    size: pageSize,
    is_component: flowType === "components",
    is_flow: flowType === "flows",
    search,
  });

  const data = {
    flows: folderData?.flows?.items ?? [],
    name: folderData?.folder?.name ?? "",
    description: folderData?.folder?.description ?? "",
    parent_id: folderData?.folder?.parent_id ?? "",
    components: folderData?.folder?.components ?? [],
    pagination: {
      page: folderData?.flows?.page ?? 1,
      size: folderData?.flows?.size ?? 12,
      total: folderData?.flows?.total ?? 0,
      pages: folderData?.flows?.pages ?? 0,
    },
  };

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  const handlePageChange = useCallback((newPageIndex, newPageSize) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  }, []);

  const onSearch = useCallback((newSearch) => {
    setSearch(newSearch);
    setPageIndex(1);
  }, []);

  useEffect(() => {
    // Wait until both the global flows store has populated and the folder
    // query has settled (success or error) before deciding whether the
    // folder is empty. This avoids a one-frame flash of <EmptyFolder> on
    // initial mount and right after login, when the store is briefly
    // stale. Gating on isLoading instead of folderData lets us still
    // resolve when the query errors out (e.g. when there is no valid
    // folder id to query, after deleting all folders).
    if (flows === undefined || isLoading) return;
    setIsEmptyFolder(
      isFolderEmpty({
        flows,
        folderId: folderId ?? myCollectionId ?? "",
        folderTotal: folderData?.flows?.total,
        enableMcp: ENABLE_MCP,
      }),
    );
  }, [flows, folderId, myCollectionId, folderData, isLoading]);

  const handleFileDrop = useFileDrop(isEmptyFolder ? undefined : flowType);

  useEffect(() => {
    if (
      !isEmptyFolder &&
      flows?.find(
        (flow) =>
          flow.folder_id === (folderId ?? myCollectionId) &&
          flow.is_component === (flowType === "components"),
      ) === undefined
    ) {
      const otherTabHasItems =
        flows?.find(
          (flow) =>
            flow.folder_id === (folderId ?? myCollectionId) &&
            flow.is_component === (flowType === "flows"),
        ) !== undefined;

      if (otherTabHasItems) {
        setFlowType(flowType === "flows" ? "components" : "flows");
      }
    }
  }, [isEmptyFolder]);

  const [selectedFlows, setSelectedFlows] = useState<string[]>([]);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null,
  );
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only track these keys when we're in list/selection mode and not when a modal is open
      // or when an input field is focused
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "Shift") {
        setIsShiftPressed(true);
      } else if ((!IS_MAC && e.key === "Control") || e.key === "Meta") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "Shift") {
        setIsShiftPressed(false);
      } else if ((!IS_MAC && e.key === "Control") || e.key === "Meta") {
        setIsCtrlPressed(false);
      }
    };

    // Reset key states when window loses focus
    const handleBlur = () => {
      setIsShiftPressed(false);
      setIsCtrlPressed(false);
    };

    // Only add listeners if we're in flows or components mode, not MCP mode
    if (flowType === "flows" || flowType === "components") {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      window.addEventListener("blur", handleBlur);
    }

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);

      // Reset key states on unmount
      setIsShiftPressed(false);
      setIsCtrlPressed(false);
    };
  }, [flowType]);

  const setSelectedFlow = useCallback(
    (selected: boolean, flowId: string, index: number) => {
      setLastSelectedIndex(index);
      if (isShiftPressed && lastSelectedIndex !== null) {
        // Find the indices of the last selected and current flow
        const flows = data.flows;

        // Determine the range to select
        const start = Math.min(lastSelectedIndex, index);
        const end = Math.max(lastSelectedIndex, index);
        // Get all flow IDs in the range
        const flowsToSelect = flows
          .slice(start, end + 1)
          .map((flow) => flow.id);

        // Update selection
        if (selected) {
          setSelectedFlows((prev) =>
            Array.from(new Set([...prev, ...flowsToSelect])),
          );
        } else {
          setSelectedFlows((prev) =>
            prev.filter((id) => !flowsToSelect.includes(id)),
          );
        }
      } else {
        if (selected) {
          setSelectedFlows([...selectedFlows, flowId]);
        } else {
          setSelectedFlows(selectedFlows.filter((id) => id !== flowId));
        }
      }
    },
    [selectedFlows, lastSelectedIndex, data.flows, isShiftPressed],
  );

  useEffect(() => {
    setSelectedFlows((old) =>
      old.filter((id) => data.flows.some((flow) => flow.id === id)),
    );
  }, [folderData?.flows?.items]);

  // Reset key states when navigating away
  useEffect(() => {
    return () => {
      setIsShiftPressed(false);
      setIsCtrlPressed(false);
    };
  }, [folderId]);

  return (
    <CardsWrapComponent
      onFileDrop={flowType === "mcp" ? undefined : handleFileDrop}
      dragMessage={
        isEmptyFolder
          ? t("home.dragFlowsOrComponents")
          : t("home.dragFlowType", { flowType })
      }
    >
      <div
        className="flex h-full w-full flex-col overflow-y-auto"
        data-testid="cards-wrapper"
      >
        <div className="flex h-full w-full flex-col 3xl:container">
          {ENABLE_DATASTAX_LANGFLOW && <CustomBanner />}
          <div className="flex flex-1 flex-col justify-start p-4">
            <div className="flex h-full flex-col justify-start">
              
              {/* Premium Enterprise AI Platform Hero Landing */}
              <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-800/40 bg-zinc-950/40 p-8 backdrop-blur-xl">
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/8 blur-[60px] pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-cyan-500/8 blur-[60px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 border border-purple-500/20 text-xxs font-semibold uppercase tracking-wider text-purple-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                      </span>
                      Enterprise AI Platform
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      SynthoOS Workspace
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      The ultimate control plane for agentic AI. Design, test, and run intelligent multi-agent systems and connected cognitive workflows.
                    </p>
                  </div>
                  <button
                    onClick={() => startNewFlow()}
                    className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-purple-500/25 active:scale-[0.98] shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    <span>Open Workflow Builder</span>
                    <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </button>
                </div>
              </div>

              {/* Quick Statistics Row */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-4 backdrop-blur-md">
                  <div className="text-xxs font-medium uppercase tracking-wider text-zinc-400">Total Workflows</div>
                  <div className="mt-1.5 text-2xl font-bold text-zinc-100">{data?.pagination?.total || 0}</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-4 backdrop-blur-md">
                  <div className="text-xxs font-medium uppercase tracking-wider text-zinc-400">Connected Agents</div>
                  <div className="mt-1.5 text-2xl font-bold text-zinc-100">{flows?.filter(f => !f.is_component)?.length || 0}</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-4 backdrop-blur-md">
                  <div className="text-xxs font-medium uppercase tracking-wider text-zinc-400">Custom Components</div>
                  <div className="mt-1.5 text-2xl font-bold text-zinc-100">{flows?.filter(f => f.is_component)?.length || 0}</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-4 backdrop-blur-md">
                  <div className="text-xxs font-medium uppercase tracking-wider text-zinc-400">System Status</div>
                  <div className="mt-1.5 flex items-center gap-2 text-base font-bold text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Operational
                  </div>
                </div>
              </div>

              {/* Premium Enterprise AI Workspace Grid */}
              <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800/40 bg-zinc-950/20 p-6 backdrop-blur-xl">
                {/* Glowing mesh background */}
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-purple-500/8 blur-[60px] pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-cyan-500/8 blur-[60px] pointer-events-none" />

                <div className="relative z-10 mb-5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      Workspace Modules
                    </h2>
                    <p className="text-xs text-muted-foreground/80">
                      Quick access links to active modules, databases, assets, and keys
                    </p>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {workspaceCards.map((card) => (
                    <button
                      key={card.title}
                      onClick={card.action}
                      className="group flex items-center gap-4 rounded-xl border border-white/5 bg-zinc-900/40 p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 hover:bg-zinc-900/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 border border-purple-500/20 group-hover:border-cyan-500/40 transition-colors duration-300">
                        {card.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors">
                          {card.title}
                        </span>
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                          {card.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Workflows / Recent Projects Section */}
              <div className="mt-2">
                <HeaderComponent
                  folderName={folderName}
                  flowType={flowType}
                  setFlowType={setFlowType}
                  view={view}
                  setView={setView}
                  setNewProjectModal={setNewProjectModal}
                  onNewFlow={startNewFlow}
                  setSearch={onSearch}
                  isEmptyFolder={isEmptyFolder === true}
                  selectedFlows={selectedFlows}
                />

                {isEmptyFolder === true ? (
                  <EmptyFolder
                    setOpenModal={setNewProjectModal}
                    onNewFlow={startNewFlow}
                  />
                ) : (
                  <div className="flex h-full flex-col mt-4">
                    {isLoading || isEmptyFolder === null ? (
                      view === "grid" ? (
                        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
                          <ListSkeleton />
                          <ListSkeleton />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <ListSkeleton />
                          <ListSkeleton />
                        </div>
                      )
                    ) : flowType === "mcp" ? (
                      <CustomMcpServerTab folderName={folderName} />
                    ) : flowType === "deployments" ? (
                      <DeploymentsPage />
                    ) : (flowType === "flows" || flowType === "components") &&
                      data &&
                      data.pagination.total > 0 ? (
                      view === "grid" ? (
                        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
                          {data.flows.map((flow, index) => (
                            <ListComponent
                              key={flow.id}
                              flowData={flow}
                              selected={selectedFlows.includes(flow.id)}
                              setSelected={(selected) =>
                                setSelectedFlow(selected, flow.id, index)
                              }
                              shiftPressed={isShiftPressed || isCtrlPressed}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          {data.flows.map((flow, index) => (
                            <ListComponent
                              key={flow.id}
                              flowData={flow}
                              selected={selectedFlows.includes(flow.id)}
                              setSelected={(selected) =>
                                setSelectedFlow(selected, flow.id, index)
                              }
                              shiftPressed={isShiftPressed || isCtrlPressed}
                            />
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="pt-24 text-center text-sm text-secondary-foreground">
                        {t("home.flowTypeNotSupported", { flowType })}
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
          {(flowType === "flows" || flowType === "components") &&
            !isLoading &&
            !isEmptyFolder &&
            data.pagination.total >= 10 && (
              <div className="flex justify-end px-3 py-4">
                <PaginatorComponent
                  pageIndex={data.pagination.page}
                  pageSize={data.pagination.size}
                  rowsCount={[12, 24, 48, 96]}
                  totalRowsCount={data.pagination.total}
                  paginate={handlePageChange}
                  pages={data.pagination.pages}
                  isComponent={flowType === "components"}
                />
              </div>
            )}
        </div>
      </div>

      <ModalsComponent
        openModal={newProjectModal}
        setOpenModal={setNewProjectModal}
        openDeleteFolderModal={false}
        setOpenDeleteFolderModal={() => {}}
        handleDeleteFolder={() => {}}
      />
    </CardsWrapComponent>
  );
};

export default HomePage;

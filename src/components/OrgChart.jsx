import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

// --- Custom Node ---
const CustomNode = ({ data }) => {
  const handleEmail = (e) => {
    e.stopPropagation();
    alert(`📧 Gửi email tới ${data.email || data.label}`);
  };

  const handlePhone = (e) => {
    e.stopPropagation();
    alert(`📞 Gọi cho ${data.phone || "n/a"}`);
  };

  return (
    <div
      className="bg-base-200 border border-base-300 rounded-xl w-64 shadow-lg p-4 
                 text-base-content transition-transform hover:scale-[1.03] duration-300 cursor-pointer"
      onClick={data.onClick}
    >
      <div className="flex items-center gap-3">
        <img
          src={data.img || "https://api.dicebear.com/9.x/adventurer/png?seed=fallback"}
          alt={data.name || data.label}
          className="w-14 h-14 rounded-full border-2 border-primary object-cover"
        />
        <div>
          <div className="text-sm font-semibold">{data.name || data.label}</div>
          <div className="text-xs text-neutral">{data.title || ""}</div>
        </div>
      </div>

      {data.department && (
        <div
          className="mt-3 text-xs px-2 py-1 rounded-md inline-block font-medium text-white"
          style={{ backgroundColor: data.deptColor }}
        >
          {data.department}
        </div>
      )}

      <div className="mt-3 flex justify-between text-xs">
        <button
          onClick={handleEmail}
          className="bg-base-300 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-base-100 transition-colors"
        >
          📧 Email
        </button>
        <button
          onClick={handlePhone}
          className="bg-base-300 px-3 py-1 rounded-md flex items-center gap-1 hover:bg-base-100 transition-colors"
        >
          📞 Phone
        </button>
      </div>

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

// --- OrgChartFlow ---
const OrgChartFlow = () => {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const [selectedNode, setSelectedNode] = useState(null);

  // --- Base nodes ---
  const baseNodes = [
    { id: "1", data: { label: "Mrs. Clark" } },
    { id: "2", data: { label: "Mr. Jones" } },
    { id: "3", data: { label: "Mrs. Harris" } },
    { id: "4", data: { label: "Mrs. Peterson" } },
    { id: "5", data: { label: "Mrs. Bell" } },
    { id: "6", data: { label: "Mrs. Campbell" } },
    { id: "7", data: { label: "Mr. Sanchez" } },
    { id: "8", data: { label: "Mrs. Garcia" } },
    { id: "9", data: { label: "Mr. James" } },
    { id: "10", data: { label: "Mr. Hayes" } },
    { id: "11", data: { label: "Mrs. Jones_A" } },
    { id: "12", data: { label: "Mrs. Nelson" } },
    { id: "13", data: { label: "Mrs. Jones_B" } },
    { id: "14", data: { label: "Mrs. Rivera" } },
    { id: "15", data: { label: "Mr. Robinson" } },
    { id: "16", data: { label: "Mr. Bailey" } },
    { id: "17", data: { label: "Mr. Thompson" } },
    { id: "18", data: { label: "Mr. Patterson" } },
    { id: "19", data: { label: "Mr. Collins" } },
    { id: "20", data: { label: "Mr. Roberts" } },
    { id: "21", data: { label: "Mr. Reed" } },
    { id: "22", data: { label: "Mr. Perry" } },
  ];

  // --- Edges ---
  const edgesData = [
    { id: "e2-1", source: "2", target: "1" },
    { id: "e3-1", source: "3", target: "1" },
    { id: "e4-1", source: "4", target: "1" },
    { id: "e5-2", source: "5", target: "2" },
    { id: "e5-3", source: "5", target: "3" },
    { id: "e6-3", source: "6", target: "3" },
    { id: "e6-4", source: "6", target: "4" },
    { id: "e7-4", source: "7", target: "4" },
    { id: "e8-4", source: "8", target: "4" },
    { id: "e9-5", source: "9", target: "5" },
    { id: "e10-9", source: "10", target: "9" },
    { id: "e11-6", source: "11", target: "6" },
    { id: "e12-6", source: "12", target: "6" },
    { id: "e13-7", source: "13", target: "7" },
    { id: "e14-8", source: "14", target: "8" },
    { id: "e15-11", source: "15", target: "11" },
    { id: "e15-12", source: "15", target: "12" },
    { id: "e16-12", source: "16", target: "12" },
    { id: "e17-10", source: "17", target: "10" },
    { id: "e17-15", source: "17", target: "15" },
    { id: "e17-16", source: "17", target: "16" },
    { id: "e18-15", source: "18", target: "15" },
    { id: "e18-16", source: "18", target: "16" },
    { id: "e18-14", source: "18", target: "14" },
    { id: "e19-17", source: "19", target: "17" },
    { id: "e20-17", source: "20", target: "17" },
    { id: "e21-19", source: "21", target: "19" },
    { id: "e22-20", source: "22", target: "20" },
  ];

  // --- Layout Dagre ---
  const nodesWithDag = baseNodes.map((n) => ({
    ...n,
    data: { ...n.data, onClick: () => setSelectedNode(n.data) },
  }));

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 100, ranksep: 100 });

  nodesWithDag.forEach((node) =>
    dagreGraph.setNode(node.id, { width: 180, height: 80 })
  );
  edgesData.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);

  const nodesWithPosition = nodesWithDag.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x, y: nodeWithPosition.y },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
      type: "custom",
    };
  });

  // --- React Flow states ---
  const [nodeState, , onNodesChange] = useNodesState(nodesWithPosition);
  const [edges, , onEdgesChange] = useEdgesState(
    edgesData.map((e) => ({
      ...e,
      style: { stroke: "#6b7280", strokeWidth: 2 },
      type: "smoothstep",
      arrowHeadType: "arrowclosed",
      animated: true,
    }))
  );

  const onInit = useCallback((rf) => rf.fitView(), []);

  return (
    <div className="relative w-screen h-screen bg-base-100 text-base-content overflow-hidden">
      <ReactFlow
        nodes={nodeState}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onInit={onInit}
      >
        <MiniMap nodeColor={() => "hsl(var(--p))"} maskColor="rgba(0,0,0,0.05)" />
        <Controls />
        <Background color="hsl(var(--b3))" gap={16} />
      </ReactFlow>

      {/* Overlay chi tiết node */}
      <div
        className={`absolute top-0 right-0 w-80 h-full bg-base-200 border-l border-base-300 p-5 overflow-y-auto transition-transform duration-500 ${
          selectedNode ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedNode && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Chi tiết nhân sự
              </h2>
              <button
                onClick={() => setSelectedNode(null)}
                className="btn btn-xs btn-error text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={selectedNode.img || "https://api.dicebear.com/9.x/adventurer/png?seed=fallback"}
                alt={selectedNode.name || selectedNode.label}
                className="w-20 h-20 rounded-full border-2 border-primary mb-3"
              />
              <div className="font-semibold text-base">
                {selectedNode.name || selectedNode.label}
              </div>
              <div className="text-sm text-neutral">{selectedNode.title || ""}</div>

              {selectedNode.department && (
                <div
                  className="mt-2 text-xs px-3 py-1 rounded-md inline-block text-white font-medium"
                  style={{ backgroundColor: selectedNode.deptColor }}
                >
                  {selectedNode.department}
                </div>
              )}

              <div className="mt-4 text-left w-full">
                {selectedNode.email && (
                  <div className="mb-2 text-sm">
                    <strong>Email:</strong> {selectedNode.email}
                  </div>
                )}
                {selectedNode.phone && (
                  <div className="mb-2 text-sm">
                    <strong>Điện thoại:</strong> {selectedNode.phone}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrgChartFlow;

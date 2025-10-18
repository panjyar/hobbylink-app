import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Connection,
  Node,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useApp } from '../../context/AppContext';
import { HighScoreNode } from './HighScoreNode';
import { LowScoreNode } from './LowScoreNode';

const nodeTypes = {
  highScore: HighScoreNode,
  lowScore: LowScoreNode
};

export function GraphView() {
  const { state, linkUsers } = useApp();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [connectStart, setConnectStart] = useState<string | null>(null);

  useEffect(() => {
    if (state.users.length === 0) return;

    const newNodes: Node[] = state.users.map((user, index) => ({
      id: user.id,
      type: user.popularityScore > 5 ? 'highScore' : 'lowScore',
      position: { 
        x: (index % 3) * 300 + 100, 
        y: Math.floor(index / 3) * 200 + 100 
      },
      data: { 
        label: user.username, 
        age: user.age, 
        score: user.popularityScore || 0,
        user 
      }
    }));

    const newEdges: Edge[] = [];
    const processed = new Set<string>();
    
    state.users.forEach(user => {
      user.friends.forEach(friendId => {
        const edgeId = [user.id, friendId].sort().join('-');
        if (!processed.has(edgeId)) {
          newEdges.push({
            id: edgeId,
            source: user.id,
            target: friendId,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#9333ea', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#9333ea' }
          });
          processed.add(edgeId);
        }
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [state.users, setNodes, setEdges]);

  const onConnect = useCallback((params: Connection) => {
    if (params.source && params.target && params.source !== params.target) {
      linkUsers(params.source, params.target);
    }
  }, [linkUsers]);

  const onNodeDragStart = useCallback((event: React.MouseEvent, node: Node) => {
    setConnectStart(node.id);
  }, []);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    if (connectStart && connectStart !== node.id) {
      linkUsers(connectStart, node.id);
    }
    setConnectStart(null);
  }, [connectStart, linkUsers]);

  const handleDropHobby = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  if (state.loading) {
    return (
      <div className="graph-container center">
        <div className="spinner" style={{ width: 48, height: 48 }} />
      </div>
    );
  }

  if (state.users.length === 0) {
    return (
      <div className="graph-container center">
        <div className="text-muted">No users yet. Create one to get started!</div>
      </div>
    );
  }

  return (
    <div className="graph-container" onDrop={handleDropHobby} onDragOver={(e) => e.preventDefault()}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="#e5e7eb" gap={16} />
        <Controls />
        <MiniMap 
          nodeColor={(node) => node.type === 'highScore' ? '#8b5cf6' : '#60a5fa'}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
}
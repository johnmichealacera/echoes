import React from 'react';
import { ResonanceStage } from '../types';
import './StageFilter.css';

interface StageFilterProps {
  stages: ResonanceStage[];
  selectedStage: string | null;
  onStageSelect: (stageId: string | null) => void;
}

const StageFilter: React.FC<StageFilterProps> = ({ stages, selectedStage, onStageSelect }) => {
  return (
    <div className="stage-filter">
      <div className="filter-header">
        <h3 className="filter-title">Filter by Resonance Stage</h3>
        <button 
          className={`filter-btn all-stages ${!selectedStage ? 'active' : ''}`}
          onClick={() => onStageSelect(null)}
        >
          All Stages
        </button>
      </div>
      
      <div className="stage-buttons">
        {stages.map((stage) => (
          <button
            key={stage.id}
            className={`stage-btn ${selectedStage === stage.id ? 'active' : ''}`}
            style={{
              '--stage-color': stage.color,
              '--stage-color-light': stage.color + '20'
            } as React.CSSProperties}
            onClick={() => onStageSelect(stage.id)}
          >
            <div className="stage-btn-content">
              <span className="stage-name">{stage.name}</span>
              <span className="stage-count">{stage.songs.length} songs</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageFilter;

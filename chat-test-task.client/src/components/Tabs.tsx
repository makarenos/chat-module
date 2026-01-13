import type { TabType } from '../types';
import './Tabs.css';

interface TabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
    const tabs: TabType[] = ['All', 'Groups', 'Friends', 'Favorites'];

    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
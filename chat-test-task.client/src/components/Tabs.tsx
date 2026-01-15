import type { TabType } from '../types';
import './Tabs.css';

interface TabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
    const tabs: { value: TabType; label: string }[] = [
        { value: 'All', label: 'All Chats' },
        { value: 'Groups', label: 'Groups' },
        { value: 'Friends', label: 'Friends' },
        { value: 'Favorites', label: 'Favorites' }
    ];

    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    className={`tab ${activeTab === tab.value ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
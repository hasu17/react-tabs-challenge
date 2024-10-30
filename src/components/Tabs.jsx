import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

/**
 * Tabs component that displays content in different tabs.
 * It fetches content from an API based on the active tab.
 */

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1); // State to track the currently active tab
  const [tabContents, setTabContents] = useState({
    tab1: null,
    tab2: null,
    tab3: null,
    tab4: null,
  }); // State to store the content of each tab
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null); // State to store any error messages

  /**
   * Fetches content for the specified tab index.
   * @param {number} tabIndex - The index of the tab to fetch content for.
   */
  const fetchContent = async (tabIndex) => {
    setLoading(true);
    setError(null);

    let url = '';
    switch (tabIndex) {
      case 1:
        url = 'https://api.allorigins.win/get?url=https://loripsum.net/api/4/large';
        break;
      case 2:
        url = 'https://api.allorigins.win/get?url=https://loripsum.net/api/3/large';
        break;
      case 3:
        url = 'https://api.allorigins.win/get?url=https://loripsum.net/api/2/large';
        break;
      case 4:
        url = 'https://api.allorigins.win/get?url=https://loripsum.net/api/1/large';
        break;
      default:
        break;
    }

    try {
      // Only fetch if content is not already cached
      if (!tabContents[`tab${tabIndex}`]) {
        const response = await axios.get(url);
        const cleanedContent = response.data.contents;
        
        // Cache the fetched content in the correct tab
        setTabContents(prevContents => ({
          ...prevContents,
          [`tab${tabIndex}`]: cleanedContent
        }));
      }
    } catch (err) {
      setError('Failed to fetch content. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch content whenever active tab changes
  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab]);

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>Tab 1</button>
        <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : ''}>Tab 2</button>
        <button onClick={() => setActiveTab(3)} className={activeTab === 3 ? 'active' : ''}>Tab 3</button>
        <button onClick={() => setActiveTab(4)} className={activeTab === 4 ? 'active' : ''}>Tab 4</button>
      </div>
      
      <div className="tab-content">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <>
            {activeTab === 1 && <div dangerouslySetInnerHTML={{ __html: tabContents.tab1 }} />}
            {activeTab === 2 && <div dangerouslySetInnerHTML={{ __html: tabContents.tab2 }} />}
            {activeTab === 3 && <div dangerouslySetInnerHTML={{ __html: tabContents.tab3 }} />}
            {activeTab === 4 && <div dangerouslySetInnerHTML={{ __html: tabContents.tab4 }} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;

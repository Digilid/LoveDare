import React from 'react';
import CollectionImageDescriptions from './CollectionImageDescriptions';

export default function CuratedCollections() {
  return (
    <section className="section-padding product-section" id="boxes">
      <div className="container">
        <div className="text-center">
          <span className="tag-badge orange fade-up-element">OUR CURATED COLLECTIONS</span>
          <h2 className="section-title fade-up-element">Every Stage Deserves Care</h2>
        </div>

        {/* Curated Collections In-Depth Overview (4 Alternating Rows - One Per Box) */}
        <CollectionImageDescriptions />
      </div>
    </section>
  );
}

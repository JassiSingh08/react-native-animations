import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { animations } from '../data/animations';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();
  const path = location.pathname;
  
  let pageTitle = 'React Native Animation Components';
  let pageDescription = 'A comprehensive library of customizable, performance-optimized animations for React Native applications.';
  let structuredData = null;
  
  // Check if we're on an animation page
  if (path.startsWith('/animation/')) {
    const animationId = path.split('/animation/')[1];
    const animation = animations.find(anim => anim.id === animationId);
    
    if (animation) {
      pageTitle = `${animation.name} | React Native Animation Components`;
      pageDescription = animation.description;
      
      // Create structured data for animation
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': animation.name,
        'description': animation.description,
        'keywords': animation.tags.join(', '),
        'articleSection': 'React Native Animation',
        'articleBody': `${animation.description} Common use cases include: ${animation.useCases.join(', ')}`,
      };
    }
  }
  
  // Use custom title and description if provided
  if (title) pageTitle = title;
  if (description) pageDescription = description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={`https://rn-animations.example.com${path}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      
      {/* Structured data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://rn-animations.example.com${path}`} />
    </Helmet>
  );
};

export default SEO;
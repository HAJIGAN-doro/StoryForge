import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
};

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return <div className={`container mx-auto px-4 py-6 ${className}`}>{children}</div>;
};

export const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">{title}</h1>
      {subtitle && <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">{subtitle}</p>}
    </div>
  );
};

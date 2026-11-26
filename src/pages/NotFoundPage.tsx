import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="pt-44 pb-24 max-w-3xl mx-auto px-8 text-center">
      <div className="glass-window rounded-[28px] p-12">
        <div className="text-sm font-semibold text-[#FF5A1F] tabular-nums">404</div>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#111111]">
          This page doesn’t exist
        </h1>
        <p className="mt-3 text-base text-[#4D4B46] max-w-md mx-auto">
          The link may have moved or been typed incorrectly. Head back home or browse our
          Featured Builds.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="glass-pill-dark rounded-full px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/work" className="glass-pill rounded-full px-5 py-2.5 text-sm font-medium">
            Featured Builds
          </Link>
        </div>
      </div>
    </div>
  );
}

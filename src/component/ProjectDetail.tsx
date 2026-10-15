import { motion } from 'framer-motion';
import './ProjectDetail.css';

export interface Project {
    number: string;
    category: string;
    year: string;
    title: string;
    image: string | any;
    overview?: string;
    client?: string;
    preview?: string;
    scope?: string;
    nextProject?: string;
}

interface ProjectDetailProps {
    project: Project;
    onBack: () => void;
}

type LogoShowcase = {
    cardBg: string;
    glowColor: string;
    stageBg: string;
    maxLogoWidth: string;
};

function getLogoShowcase(title: string): LogoShowcase | null {
    const t = title.toLowerCase();
    if (t.includes('glued')) {
        return {
            cardBg: '#ffffff',
            glowColor: 'rgba(106, 13, 173, 0.10)',
            stageBg: '#faf8f5',
            maxLogoWidth: '270px',
        };
    }
    if (t.includes('veriscore')) {
        return {
            cardBg: '#ffffff',
            glowColor: 'rgba(7, 102, 173, 0.10)',
            stageBg: '#f4f8fc',
            maxLogoWidth: '220px',
        };
    }
    if (t.includes('devpilot')) {
        return {
            cardBg: '#0a0a0a',
            glowColor: 'rgba(37, 99, 235, 0.18)',
            stageBg: '#0f0f0f',
            maxLogoWidth: '220px',
        };
    }
    return null;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
    const showcase = getLogoShowcase(project.title);

    return (
        <motion.div
            className="pd-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="pd-left">
                <div className="pd-rail">
                    <div className="pd-rail-text">FOLIO — EDITION</div>
                    <div className="pd-rail-brand">MICHAEL ONYEKWERE ™</div>
                    <div className="pd-rail-year">© 2026</div>
                </div>

                <div className="pd-content ">
                    <button className="pd-back" onClick={onBack}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>

                    <h1 className="pd-title font-serif-2">{project.title.toUpperCase()}</h1>

                    <div className="pd-grid">
                        <div className="pd-section">
                            <div className="pd-label">OVERVIEW</div>
                            <div className="pd-value pd-overview">
                                {project.overview || 'A digital experience designed to make the process simpler, clearer, and more accessible for everyday needs.'}
                            </div>
                        </div>

                        <div className="pd-section">
                            <div className="pd-label">DETAILS</div>
                            <div className="pd-details-table">
                                <div className="pd-row">
                                    <span className="pd-row-label">Client</span>
                                    <span className="pd-row-value">{project.client || 'Trusting Social'}</span>
                                </div>
                                <div className="pd-row">
                                    <span className="pd-row-label">Year</span>
                                    <span className="pd-row-value">{project.year}</span>
                                </div>
                                <div className="pd-row">
                                    <span className="pd-row-label">Preview</span>
                                    <a href={project.preview || '#'} target="_blank" rel="noreferrer" className="pd-row-value pd-link">
                                        See It Live <span className="pd-arrow" aria-hidden="true">→</span>
                                    </a>
                                </div>
                                <div className="pd-row">
                                    <span className="pd-row-label">Scope</span>
                                    <span className="pd-row-value">{project.scope || 'Frontend Developer'}</span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="pd-section">
                            <div className="pd-label">NEXT PROJECTS</div>
                            <h3 className="pd-value pd-next-project font-sans">
                                {project.nextProject || 'Plant Tag'}
                            </h3>
                        </div> */}
                    </div>
                </div>
            </div>

            <div
                className={`pd-right ${showcase ? 'pd-right--logo-stage' : ''}`}
                style={showcase ? { background: showcase.stageBg } : undefined}
            >
                {showcase ? (
                    <div className="pd-logo-stage">
                        <div
                            className="pd-logo-glow"
                            style={{
                                background: `radial-gradient(circle, ${showcase.glowColor} 0%, transparent 70%)`,
                            }}
                        />
                        <motion.div
                            className="pd-logo-card"
                            style={{ background: showcase.cardBg }}
                            initial={{ opacity: 0, scale: 0.94, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={project.image as string}
                                alt={project.title}
                                className="pd-logo-img"
                                style={{ maxWidth: showcase.maxLogoWidth }}
                            />
                        </motion.div>
                    </div>
                ) : (
                    <img src={project.image as string} alt={project.title} className="pd-image" />
                )}
            </div>
        </motion.div>
    );
}

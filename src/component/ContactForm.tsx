import { useState } from 'react';
import { motion } from 'framer-motion';
import './contact-form.css';

interface FormData {
    email: string;
    name: string;
    message: string;
}

export default function ContactForm({ onClose }: { onClose?: () => void }) {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        name: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [touched, setTouched] = useState({
        email: false,
        name: false,
        message: false,
    });

    // Email validation
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Form validation
    const isFormValid =
        formData.email.trim() !== '' &&
        formData.name.trim() !== '' &&
        formData.message.trim() !== '' &&
        isValidEmail(formData.email);

    // Handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // In production, you would send this to your backend:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            setFormData({ email: '', name: '', message: '' });
            setTouched({ email: false, name: false, message: false });

            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 0.85, 0.32, 1] as const,
            },
        },
    };

    const inputFocusVariants = {
        focus: {
            borderColor: 'var(--ink)',
            boxShadow: '0 0 0 3px rgba(243, 238, 232, 0.1)',
        },
    };

    return (
        <div className="contact-screen">
            {onClose && (
                <button className="contact-close-btn" onClick={onClose} aria-label="Close">
                    CLOSE
                </button>
            )}

            <div className="contact-inner">
                {/* TOP — headline left, form right */}
                <motion.div
                    className="contact-top"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <div>
                            <h2 className="contact-title">
                                <div>LET'S</div>
                                <div>CONNECT</div>
                            </h2>
                        </div>

                        <div className="contact-bottom mt-50! max-sm:hidden!">
                            <div className="contact-meta-item">
                                <span className="contact-meta-label">Email</span>
                                <span className="contact-meta-value">onyekweremichael55@gmail.com</span>
                            </div>
                            {/* <div className="contact-meta-item">
                                <span className="contact-meta-label">Location</span>
                                <span className="contact-meta-value">Lagos, Nigeria</span>
                            </div> */}
                            <div className="contact-meta-item">
                                <span className="contact-meta-label">Status</span>
                                <span className="contact-meta-value">Open for Collaborations</span>
                            </div>
                            {/* <p className="contact-tagline">LET'S BUILD SOMETHING GREAT</p> */}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form-area"
                        onSubmit={handleSubmit}
                        variants={itemVariants}
                    >
                        {/* Name */}
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`form-input text-2xl! max-sm:text-lg! text-white! ${touched.name && !formData.name ? 'error' : ''}`}
                                placeholder="Michael"
                                whileFocus={inputFocusVariants.focus}
                                disabled={isSubmitting}
                            />
                            {touched.name && !formData.name && (
                                <motion.span
                                    className="form-error"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Name is required
                                </motion.span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`form-input text-2xl! max-sm:text-lg! text-white! ${touched.email && !isValidEmail(formData.email) ? 'error' : ''}`}
                                placeholder="michael@example.com"
                                whileFocus={inputFocusVariants.focus}
                                disabled={isSubmitting}
                            />
                            {touched.email && !isValidEmail(formData.email) && (
                                <motion.span
                                    className="form-error"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Please enter a valid email address
                                </motion.span>
                            )}
                        </div>

                        {/* Message */}
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Your Message</label>
                            <motion.textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`form-textarea text-xl! max-sm:text-[16px]! text-white! ${touched.message && !formData.message ? 'error' : ''}`}
                                placeholder="Tell me about your project, ideas, or anything else..."
                                rows={4}
                                whileFocus={inputFocusVariants.focus}
                                disabled={isSubmitting}
                            />
                            <div className="character-count">{formData.message.length} / 1000</div>
                            {touched.message && !formData.message && (
                                <motion.span
                                    className="form-error"
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Message is required
                                </motion.span>
                            )}
                        </div>

                        {/* Actions + status */}
                        <div className="form-actions mb-6!">
                            <motion.button
                                type="submit"
                                className="submit-button"
                                disabled={!isFormValid || isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        className="button-spinner"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    >
                                        ●
                                    </motion.div>
                                ) : (
                                    'Send Message'
                                )}
                            </motion.button>
                        </div>

                        <AnimateStatusMessage status={submitStatus} />
                    </motion.form>
                </motion.div>

                {/* BOTTOM — metadata bar, same as Hero */}

            </div>
        </div>
    );
}

function AnimateStatusMessage({ status }: { status: 'idle' | 'success' | 'error' }) {
    if (status === 'idle') return null;

    return (
        <motion.div
            className={`status-message ${status}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {status === 'success' ? (
                <>
                    <span className="status-icon">✓</span>
                    <span className="status-text">
                        Thanks for reaching out! I'll get back to you soon.
                    </span>
                </>
            ) : (
                <>
                    <span className="status-icon">!</span>
                    <span className="status-text">
                        Something went wrong. Please try again.
                    </span>
                </>
            )}
        </motion.div>
    );
}
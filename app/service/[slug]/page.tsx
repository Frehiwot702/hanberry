"use client";
import Navbar from '@/components/navbar'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Package, fetchPackagesByCategorySlug } from '@/app/services/package.service';
import { createBooking, AddBookingRequest } from '@/app/services/booking.servce';
import { useParams } from 'next/navigation';
import Image from 'next/image';

type BookingFormState = {
    fullname: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    quantity: number;
};

const defaultBookingForm: BookingFormState = {
    fullname: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    quantity: 1,
};

const Stepper = ({ currentStep }: { currentStep: number }) => {
    const steps = [
        'Choose package',
        'Your details',
        'Confirmation',
    ];

    return (
        <div className='mb-10 w-full'>
            <div className='mx-auto flex items-center justify-between gap-3 px-2 md:gap-6'>
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = currentStep === stepNumber;
                    const isCompleted = currentStep > stepNumber;

                    return (
                        <div key={step} className='flex flex-1 items-center'>
                            <div className='flex w-full items-end justify-between gap-2 md:gap-3'>
                                <div className='flex items-center gap-2 md:gap-3'>
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                                            isCompleted
                                                ? 'border-[#C9A34E] bg-[#C9A34E] text-white'
                                                : isActive
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-[#D9D6D0] bg-[#F6F3EE] text-[#8A8178]'
                                        }`}
                                    >
                                        {isCompleted ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg> : stepNumber}
                                    </div>
                                    <div className='hidden sm:block'>
                                        <p className={`text-xs font-medium tracking-[0.12em] text-gray-600`}>
                                            {step}
                                        </p>
                                    </div>
                                </div>
                            </div>
                           {stepNumber !== 3 && ( <hr className='w-full border border-black/10'/>)}
                            {index < steps.length - 1 && (
                                <div className='mx-2 h-px flex-1 bg-[#E4E0DB] md:mx-4'>
                                    <div
                                        className={`h-full ${currentStep > stepNumber ? 'bg-[#C9A34E]' : 'bg-[#E4E0DB]'}`}
                                        style={{ width: currentStep > stepNumber ? '100%' : '0%' }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const formatDate = (value: string) => {
    if (!value) return 'Not provided';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const categorySlug = Array.isArray(slug) ? slug[0] : slug ?? "";

    const [allPackages, setAllPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [currentStep, setCurrentStep] = useState(3);
    const [loading, setLoading] = useState(true);
    const [bookingForm, setBookingForm] = useState<BookingFormState>(defaultBookingForm);
    const [bookingError, setBookingError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedBooking, setSubmittedBooking] = useState<{
        id: string;
        fullname: string;
        phone: string;
        email: string | null;
        date: string;
        time: string;
        packageName: string;
        packagePrice: number;
        totalPrice: number;
        quantity: number;
        status: 'pending' | 'confirmed' | 'rejected' | 'done';
        submittedAt: string;
    } | null>({
        id: '1',
        fullname: 'frehiwot tewodros',
        email: null,
        phone: '0979006009',
        date: '12/2/2026',
        time: '09:89 PM',
        packageName: 'Birdal',
        packagePrice: 12000,
        totalPrice: 12000,
        quantity: 1,
        status: 'done',
        submittedAt: '12/12/2026'
    });

    useEffect(() => {
        const fetchPackages = async () => {
            if (!categorySlug) {
                setAllPackages([]);
                setSelectedPackage(null);
                setLoading(false);
                return;
            }

            try {
                const packages = await fetchPackagesByCategorySlug({ slug: categorySlug });
                setAllPackages(packages);
            } catch (error) {
                console.error('Error fetching packages by category slug:', error);
                setAllPackages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, [categorySlug]);

    useEffect(() => {
        if (allPackages.length > 0 && (!selectedPackage || !allPackages.some((pkg) => pkg.id === selectedPackage.id))) {
            setSelectedPackage(allPackages[0]);
        }
    }, [allPackages, selectedPackage]);

    const categoryTitle = categorySlug ? categorySlug.replace(/-/g, ' ') : 'Services';

    const updateFormField = <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => {
        setBookingForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePackageSelection = (pkg: Package) => {
        setSelectedPackage(pkg);
    };

    const handleContinueToDetails = () => {
        if (!selectedPackage) {
            return;
        }

        setCurrentStep(2);
        setBookingError('');
    };

    const handleSubmitBooking = async () => {
        if (!selectedPackage) {
            setBookingError('Please select a package before submitting.');
            return;
        }

        if (!bookingForm.fullname.trim() || !bookingForm.phone.trim() || !bookingForm.date || !bookingForm.time) {
            setBookingError('Please fill in your name, phone number, appointment date, and preferred time.');
            return;
        }

        const phoneNumber = bookingForm.phone.replace(/\D/g, '');
        if (!/^9\d{8}$/.test(phoneNumber)) {
            setBookingError('Please enter a valid phone number starting with 9 and containing 9 digits.');
            return;
        }

        setIsSubmitting(true);
        setBookingError('');

        try {
            const payload: AddBookingRequest = {
                fullname: bookingForm.fullname.trim(),
                phone: phoneNumber,
                date: bookingForm.date,
                time: bookingForm.time,
                package: {
                    id: selectedPackage.id,
                    name: selectedPackage.name,
                    price: Number(selectedPackage.price),
                },
                duration: selectedPackage.duration,
                email: bookingForm.email.trim() ? bookingForm.email.trim() : null,
                quantity: bookingForm.quantity,
                totalPrice: Number(selectedPackage.price) * bookingForm.quantity,
            };

            const response = await createBooking(payload);
            const bookingId = response?.id ?? 'booking-request';

            setSubmittedBooking({
                id: bookingId,
                fullname: payload.fullname,
                phone: payload.phone,
                email: payload.email,
                date: payload.date,
                time: payload.time ?? '',
                packageName: payload.package.name,
                packagePrice: payload.package.price,
                totalPrice: payload.totalPrice,
                quantity: payload.quantity,
                status: 'pending',
                submittedAt: new Date().toISOString(),
            });

            setCurrentStep(3);
        } catch (error) {
            console.error('Booking submission failed:', error);
            setBookingError('There was a problem submitting your booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-white text-black'>
                Loading...
            </div>
        );
    }
    console.log({allPackages})

    if (allPackages.length === 0) {
        return (
            <>
                <Navbar />
                <div className='bg-white text-black w-full min-h-screen px-10 py-8'>
                    <Link href='/#services' className='text-black/50 text-lg mb-4 flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                        Back to Services
                    </Link>

                    <div className='flex flex-col gap-3 mb-10 mt-5'>
                        <h3 className='first-letter:uppercase text-4xl font-bold'>{categoryTitle} Makeup Packages</h3>
                    </div>

                    <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-[#E0BFB8]/10 p-10 text-center'>
                        <h4 className='text-2xl font-semibold mb-2'>No packages available</h4>
                        <p className='text-gray-600'>There are currently no makeup packages for this category. Please check back soon.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className=''>
            <Navbar />
            <div className='text-black md:max-w-7xl mx-auto min-h-screen px-4 py-8 md:px-10'>
                <Link href='/#services' className='text-black/50 text-lg mb-4 flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                    Back to Services
                </Link>

                <div className='flex flex-col gap-3 mb-10 mt-5'>
                    <h3 className='first-letter:uppercase text-4xl md:text-5xl' style={{fontFamily: 'cormorant'}}>{categoryTitle} Makeup Packages</h3>
                    <p className='text-gray-700'>Choose the perfect packages for your special day</p>
                </div>

                <Stepper currentStep={currentStep} />

                {currentStep === 1 && (
                    <>
                        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
                            {allPackages.map((pkg) => {
                                const isSelected = selectedPackage?.id === pkg.id;

                                return (
                                    <button
                                        key={pkg.id}
                                        type='button'
                                        aria-pressed={isSelected}
                                        aria-label={`Select ${pkg.name} package`}
                                        onClick={() => handlePackageSelection(pkg)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                event.preventDefault();
                                                handlePackageSelection(pkg);
                                            }
                                        }}
                                        className={`group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E0BFB8]/50 ${
                                            isSelected
                                                ? 'border-[#C9A34E] bg-[#FFF8F3] shadow-[0_20px_40px_rgba(122,91,17,0.12)]'
                                                : 'border-[#E8E1D9] bg-white shadow-[0_12px_24px_rgba(15,23,42,0.04)] hover:border-[#d0a090] hover:shadow-[0_16px_32px_rgba(15,23,42,0.08)]'
                                        }`}
                                    >
                                        <div className='w-full absolute px-5 top-4 z-20 flex items-center justify-between gap-2'>
                                            {isSelected && (
                                                <span className='inline-flex items-center gap-1 rounded-full bg-[#C9A34E] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                                                    Selected
                                                </span>
                                            )}
                                        </div>

                                        {pkg.isPopular && (
                                            <div className='absolute right-4 top-4 z-20'>
                                                <span className='rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A5B11]'>Popular</span>
                                            </div>
                                        )}

                                        <div className='relative h-[300px] w-full overflow-hidden'>
                                            <Image
                                                src={pkg.coverImage}
                                                alt={pkg.name}
                                                fill
                                                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent' />
                                            {isSelected && (
                                                <div className='absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A34E] text-black shadow-lg'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                                                </div>
                                            )}
                                        </div>

                                        <div className='flex flex-1 flex-col gap-4 p-5'>
                                            <div className='flex items-start justify-between gap-3'>
                                                <h3 className='text-2xl font-bold leading-tight first-letter:uppercase'>{pkg.name}</h3>
                                                <span className='rounded-full border border-[#E8E1D9] bg-[#F7F4F1] px-2.5 py-1 text-sm font-semibold text-black'>
                                                    {pkg.price.toLocaleString()} ETB
                                                </span>
                                            </div>

                                            <p className='text-sm leading-6 text-gray-700'>{pkg.description}</p>

                                            <div>
                                                <p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8178]'>Includes</p>
                                                <ul className='space-y-2 text-sm text-gray-700'>
                                                    {pkg.includes.map((item, index) => (
                                                        <li key={`${pkg.id}-include-${index}`} className='flex items-center gap-2'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-[#7A5B11]"><path d="M20 6 9 17l-5-5" /></svg>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className='mt-auto flex items-center justify-between border-t border-[#EEE7E1] pt-4'>
                                                <span className='text-sm text-gray-600'>Duration</span>
                                                <span className='text-sm font-semibold text-black'>{pkg.duration}</span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className='sticky bottom-4 z-40 mt-10 flex justify-end pb-1'>
                            <button
                                type='button'
                                disabled={!selectedPackage}
                                className='inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#C9A34E] hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 md:px-8'
                                onClick={handleContinueToDetails}
                            >
                                <span>{selectedPackage ? `Continue with ${selectedPackage.name}` : 'Select a package'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></svg>
                            </button>
                        </div>
                    </>
                )}

                {currentStep === 2 && selectedPackage && (
                    <div className='mx-auto w-full rounded-2xl'>
                        {/* <div className='mb-6 rounded-xl bg-[#F8F2E9] p-4 md:p-5'>
                            <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8178]'>Selected package</p>
                            <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                                <div>
                                    <h4 className='text-xl font-bold text-black'>{selectedPackage.name}</h4>
                                    <p className='text-sm text-gray-600'>{selectedPackage.duration}</p>
                                </div>
                                <div className='text-left md:text-right'>
                                    <p className='text-xl font-bold text-black'>{selectedPackage.price.toLocaleString()} ETB</p>
                                </div>
                            </div>
                        </div> */}

                        <div className='mb-8'>
                            <h3 className='text-2xl' style={{fontFamily: 'cormorant'}}>Personal Information</h3>
                            <p className='text-sm'>So we know who we are preparing for</p>
                            <div className='grid gap-6 md:grid-cols-2 mt-5'>
                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Full Name</label>
                                    <input
                                        type='text'
                                        value={bookingForm.fullname}
                                        onChange={(event) => updateFormField('fullname', event.target.value)}
                                        placeholder='Enter your full name'
                                        className='w-full border-b border-gray-400 bg-transparent pb-2 text-black outline-none placeholder:text-gray-500 focus:border-black'
                                    />
                                </div>

                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Phone Number</label>
                                    <div className='flex items-center gap-2 border-b border-gray-400 pb-2'>
                                        <span className='text-sm text-gray-600'>+251</span>
                                        <input
                                            type='tel'
                                            value={bookingForm.phone}
                                            onChange={(event) => updateFormField('phone', event.target.value.replace(/\D/g, '').slice(0, 9))}
                                            placeholder='912345678'
                                            className='w-full bg-transparent text-black outline-none placeholder:text-gray-500'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Email (optional)</label>
                                    <input
                                        type='email'
                                        value={bookingForm.email}
                                        onChange={(event) => updateFormField('email', event.target.value)}
                                        placeholder='your@email.com'
                                        className='w-full border-b border-gray-400 bg-transparent pb-2 text-black outline-none placeholder:text-gray-500 focus:border-black'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mb-8'>
                            <h3 className='text-2xl' style={{fontFamily: 'cormorant'}}>Appointment</h3>
                            <p className='text-sm'>When you would like to schedule your appointment</p>

                            <div className='grid gap-6 md:grid-cols-2 mt-5'>

                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Preferred Date</label>
                                    <input
                                        type='date'
                                        value={bookingForm.date}
                                        onChange={(event) => updateFormField('date', event.target.value)}
                                        className='w-full border-b border-gray-400 bg-transparent pb-2 text-black outline-none focus:border-black'
                                    />
                                </div>

                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Preferred Time</label>
                                    <input
                                        type='time'
                                        value={bookingForm.time}
                                        onChange={(event) => updateFormField('time', event.target.value)}
                                        className='w-full border-b border-gray-400 bg-transparent pb-2 text-black outline-none focus:border-black'
                                    />
                                </div>

                                <div>
                                    <label className='mb-2 block text-sm font-semibold text-black'>Number of People</label>
                                    <div className='flex items-center gap-3'>
                                        <button
                                            type='button'
                                            onClick={() => updateFormField('quantity', Math.max(1, bookingForm.quantity - 1))}
                                            className='flex h-10 w-10 items-center justify-center rounded-full border border-black text-xl font-medium'
                                        >
                                            -
                                        </button>
                                        <span className='min-w-10 text-center text-lg font-semibold'>{bookingForm.quantity}</span>
                                        <button
                                            type='button'
                                            onClick={() => updateFormField('quantity', bookingForm.quantity + 1)}
                                            className='flex h-10 w-10 items-center justify-center rounded-full border border-black text-xl font-medium'
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className='grid gap-6 md:grid-cols-2'>
                            

                            
                        </div>

                        {bookingError && (
                            <div className='mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                                {bookingError}
                            </div>
                        )}

                        <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between'>
                            <button
                                type='button'
                                onClick={() => setCurrentStep(1)}
                                className='rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white'
                            >
                                Back to Packages
                            </button>

                            <button
                                type='button'
                                onClick={handleSubmitBooking}
                                disabled={isSubmitting}
                                className='rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C9A34E] hover:text-black disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
                            >
                                {isSubmitting ? 'Submitting...' : 'Review & Submit'}
                            </button>
                        </div>
                    </div>
                )}

{/* submittedBooking */}
                {currentStep === 3 && submittedBooking && (
                    <div className='mx-auto max-w-3xl rounded-2xl p-6 md:p-8'>
                          {/*<div className='mb-6 flex items-center justify-between gap-4 border-b border-[#E4E0DB] pb-4'> 
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8178]'>Booking Submitted</p>
                                <h3 className='mt-2 text-2xl font-bold text-black'>Your request is in!</h3>
                            </div> */}
                            {/* <div className='rounded-full bg-[#F8F2E9] px-3 py-2 text-sm font-semibold text-[#7A5B11]'>
                                {submittedBooking.status === 'pending' ? 'Pending Confirmation' : submittedBooking.status}
                            </div> */}
                        {/* </div> */}

                        <div className='text-center space-y-3'>
                            <div className='space-y-3'>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold border-[#6B7A5E] bg-[#6B7A5E] text-white mx-auto `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg> 
                                </div>
                                <p className='text-3xl' style={{fontFamily: 'cormorant'}}>Your request has been sent</p> 
                            </div>
                            <p>We've recieved your booking request and will confirm your appointment shortly.  We will reach out to you to finalize the details.</p>
                        </div>

                        <div className='mt-10'>
                            <div className='flex items-center justify-between gap-3 border-b border-[#E4E0DB] pb-4'>
                                <h3>Full Name </h3>
                                <p className='first-letter:uppercase'>{submittedBooking.fullname}</p>
                            </div>
                            <div className='flex items-center justify-between gap-3 border-b border-[#E4E0DB] pb-4'>
                                <h3>Phone </h3>
                                <p className='first-letter:uppercase'>{submittedBooking.fullname}</p>
                            </div>
                        </div>

                        <div className='mt-6 rounded-xl border border-[#E4E0DB] p-4'>
                            <p className='text-sm text-gray-600'>Disclaimer!</p> 
                            <p className='mt-2 text-sm text-gray-600'> This booking is for availability checking only. Confirmation and payment process will be arranged directly with the makeup artist. </p>
                        </div>

                        <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <Link href='/' className='rounded-full border border-black px-6 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white'>
                                Back to Homepage
                            </Link>
                            <button
                                type='button'
                                onClick={() => {
                                    setCurrentStep(1);
                                    setSubmittedBooking(null);
                                    setBookingForm(defaultBookingForm);
                                    setBookingError('');
                                }}
                                className='rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C9A34E] hover:text-black'
                            >
                                Book Another Package
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceDetail
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Upload, Plus, Minus, Building, User, Globe, DollarSign, Shield, Gavel, Settings, Heart, FileText } from 'lucide-react';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Section 1: Founder & Company Information
    fullName: '',
    companyName: '',
    countryIncorporation: '',
    registrationNumber: '',
    contactEmail: '',
    contactPhone: '',
    certificateIncorporation: null,
    businessLicense: null,

    // Section 2: Business Overview
    mission: '',
    problemSolved: '',
    coreProductService: '',
    businessModel: '',
    uniqueSellingProposition: '',

    // Section 3: Market, Traction & Customers
    targetMarkets: '',
    currentTraction: '',
    keyMilestones: '',
    growthData: '',

    // Section 4: Stage & Funding
    businessStage: '',
    fundingRaised: '',
    amountToRaise: '',
    valuation: '',
    useOfFunds: '',

    // Section 5: Team & Governance
    coreTeam: [{ name: '', role: '' }],
    advisorsBoard: [{ name: '', role: '' }],
    shareholderDetails: '',
    governanceStructure: '',

    // Section 6: Shariah Compliance Statement
    shariahCompliance: '',
    hasShariahCertificate: '',
    shariahDocuments: null,

    // Section 7: Financial Overview
    currentRevenue: '',
    burnRateProfitability: '',
    financialProjections: null,
    capTable: null,

    // Section 8: Legal & Intellectual Property
    ownsIP: '',
    legalIssues: '',
    legalExplanation: '',

    // Section 9: Funding Structure Preferences
    fundingTypes: [],
    preferredTicketSize: '',

    // Section 10: Platform Engagement
    joinRoadshows: false,
    joinDemoDays: false,
    joinHalalIncubator: false,
    showcaseInMarketplace: false,

    // Section 11: Ethical & ESG Alignment
    contributesToSDGs: '',
    sdgList: '',
    socialEnvironmentalImpact: '',

    // Section 12: Declarations
    agreeTrueAccurate: false,
    consentShariahScreening: false,
    agreeEthicalStandards: false,
  });

  const totalSteps = 12;

  const steps = [
    { id: 1, title: 'Company Info', icon: <Building className="w-5 h-5" />, description: 'Basic company details' },
    { id: 2, title: 'Business Overview', icon: <Globe className="w-5 h-5" />, description: 'Your business model' },
    { id: 3, title: 'Market & Traction', icon: <DollarSign className="w-5 h-5" />, description: 'Current progress' },
    { id: 4, title: 'Funding Stage', icon: <DollarSign className="w-5 h-5" />, description: 'Investment details' },
    { id: 5, title: 'Team', icon: <User className="w-5 h-5" />, description: 'Core team members' },
    { id: 6, title: 'Shariah Compliance', icon: <Shield className="w-5 h-5" />, description: 'Islamic finance compliance' },
    { id: 7, title: 'Financials', icon: <DollarSign className="w-5 h-5" />, description: 'Financial overview' },
    { id: 8, title: 'Legal & IP', icon: <Gavel className="w-5 h-5" />, description: 'Legal matters' },
    { id: 9, title: 'Funding Preferences', icon: <Settings className="w-5 h-5" />, description: 'Investment preferences' },
    { id: 10, title: 'Platform Engagement', icon: <Globe className="w-5 h-5" />, description: 'Platform participation' },
    { id: 11, title: 'ESG Alignment', icon: <Heart className="w-5 h-5" />, description: 'Social impact' },
    { id: 12, title: 'Declarations', icon: <FileText className="w-5 h-5" />, description: 'Final agreements' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleDynamicChange = (e, index, type) => {
    const { name, value } = e.target;
    const list = [...formData[type]];
    list[index][name] = value;
    setFormData(prevData => ({
      ...prevData,
      [type]: list,
    }));
  };

  const addDynamicField = (type) => {
    setFormData(prevData => ({
      ...prevData,
      [type]: [...prevData[type], { name: '', role: '' }],
    }));
  };

  const removeDynamicField = (index, type) => {
    const list = [...formData[type]];
    list.splice(index, 1);
    setFormData(prevData => ({
      ...prevData,
      [type]: list,
    }));
  };

  const handleCheckboxGroupChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const currentTypes = prevData.fundingTypes;
      if (checked) {
        return { ...prevData, fundingTypes: [...currentTypes, value] };
      } else {
        return {
          ...prevData,
          fundingTypes: currentTypes.filter(type => type !== value),
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Application submitted successfully! Check the console for data.');
  };

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm text-gray-500">
          {Math.round((currentStep / totalSteps) * 100)}% complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Step Navigation */}
      <div className="mt-6 hidden lg:block">
        <div className="grid grid-cols-6 gap-2">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                step.id === currentStep
                  ? 'bg-blue-50 border-blue-300 shadow-md'
                  : step.id < currentStep
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setCurrentStep(step.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded ${
                  step.id === currentStep
                    ? 'bg-blue-600 text-white'
                    : step.id < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {step.id < currentStep ? <Check className="w-3 h-3" /> : step.icon}
                </div>
                <div>
                  <div className="text-xs font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500 hidden xl:block">{step.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const FormField = ({ label, children, required = false, className = '' }) => (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  const Input = ({ className = '', ...props }) => (
    <input
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${className}`}
      {...props}
    />
  );

  const TextArea = ({ className = '', ...props }) => (
    <textarea
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none text-sm ${className}`}
      {...props}
    />
  );

  const Select = ({ className = '', children, ...props }) => (
    <select
      className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${className}`}
      {...props}
    >
      {children}
    </select>
  );

  const FileUpload = ({ name, onChange, file, label }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors duration-200">
      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
      <div className="mb-3">
        <label htmlFor={name} className="cursor-pointer">
          <span className="block text-sm font-medium text-gray-900">{label}</span>
          <span className="block text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</span>
        </label>
        <input
          id={name}
          name={name}
          type="file"
          className="sr-only"
          onChange={onChange}
          accept=".png,.jpg,.jpeg,.pdf"
        />
      </div>
      <button
        type="button"
        className="bg-white py-1.5 px-3 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => document.getElementById(name).click()}
      >
        Select file
      </button>
      {file && (
        <p className="mt-2 text-xs text-green-600 font-medium">
          ✓ {file.name}
        </p>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Information</h2>
              <p className="text-gray-600 text-sm">Tell us about your company and founder details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Full Name of Founder/Primary Contact" required>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormField>

              <FormField label="Company Name" required>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </FormField>

              <FormField label="Country of Incorporation" required>
                <Input
                  type="text"
                  name="countryIncorporation"
                  value={formData.countryIncorporation}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                />
              </FormField>

              <FormField label="Registration Number">
                <Input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                />
              </FormField>

              <FormField label="Contact Email" required>
                <Input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                />
              </FormField>

              <FormField label="Contact Phone">
                <Input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormField label="Certificate of Incorporation">
                <FileUpload
                  name="certificateIncorporation"
                  onChange={handleFileChange}
                  file={formData.certificateIncorporation}
                  label="Upload certificate"
                />
              </FormField>

              <FormField label="Business License (if available)">
                <FileUpload
                  name="businessLicense"
                  onChange={handleFileChange}
                  file={formData.businessLicense}
                  label="Upload license"
                />
              </FormField>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Business Overview</h2>
              <p className="text-gray-600 text-sm">Describe your business model and value proposition</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Startup Mission" required>
                <TextArea
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your company's mission and vision"
                  required
                />
              </FormField>

              <FormField label="Problem Solved" required>
                <TextArea
                  name="problemSolved"
                  value={formData.problemSolved}
                  onChange={handleChange}
                  rows="3"
                  placeholder="What problem does your startup solve?"
                  required
                />
              </FormField>

              <FormField label="Core Product/Service" required>
                <TextArea
                  name="coreProductService"
                  value={formData.coreProductService}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your main product or service"
                  required
                />
              </FormField>

              <FormField label="Business Model" required>
                <TextArea
                  name="businessModel"
                  value={formData.businessModel}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How does your business make money?"
                  required
                />
              </FormField>
            </div>

            <FormField label="What makes your solution unique?" required>
              <TextArea
                name="uniqueSellingProposition"
                value={formData.uniqueSellingProposition}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your unique value proposition"
                required
              />
            </FormField>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Market, Traction & Customers</h2>
              <p className="text-gray-600 text-sm">Share your market progress and achievements</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Which market(s) are you targeting?" required>
                <Input
                  type="text"
                  name="targetMarkets"
                  value={formData.targetMarkets}
                  onChange={handleChange}
                  placeholder="e.g., B2B SaaS, Consumer fintech, etc."
                  required
                />
              </FormField>

              <FormField label="Monthly/Quarterly growth data">
                <Input
                  type="text"
                  name="growthData"
                  value={formData.growthData}
                  onChange={handleChange}
                  placeholder="e.g., 20% MoM user growth, 15% revenue growth"
                />
              </FormField>

              <FormField label="Please share current traction (users, revenue, partnerships)">
                <TextArea
                  name="currentTraction"
                  value={formData.currentTraction}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your current traction and key metrics"
                />
              </FormField>

              <FormField label="Key milestones achieved">
                <TextArea
                  name="keyMilestones"
                  value={formData.keyMilestones}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List your major achievements and milestones"
                />
              </FormField>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Stage & Funding</h2>
              <p className="text-gray-600 text-sm">Tell us about your funding requirements and stage</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField label="What stage is your business in?" required>
                <Select
                  name="businessStage"
                  value={formData.businessStage}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Stage</option>
                  <option value="MVP">MVP</option>
                  <option value="Early Revenue">Early Revenue</option>
                  <option value="Scaling">Scaling</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Other">Other</option>
                </Select>
              </FormField>

              <FormField label="Funding raised so far (if any)">
                <Input
                  type="text"
                  name="fundingRaised"
                  value={formData.fundingRaised}
                  onChange={handleChange}
                  placeholder="e.g., $500K seed round"
                />
              </FormField>

              <FormField label="Amount looking to raise now" required>
                <Input
                  type="text"
                  name="amountToRaise"
                  value={formData.amountToRaise}
                  onChange={handleChange}
                  placeholder="e.g., $1M - $5M"
                  required
                />
              </FormField>

              <FormField label="Current valuation">
                <Input
                  type="text"
                  name="valuation"
                  value={formData.valuation}
                  onChange={handleChange}
                  placeholder="e.g., $10M pre-money"
                />
              </FormField>
            </div>

            <FormField label="Planned use of funds" required>
              <TextArea
                name="useOfFunds"
                value={formData.useOfFunds}
                onChange={handleChange}
                rows="3"
                placeholder="How will you use the investment funds?"
                required
              />
            </FormField>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Team & Governance</h2>
              <p className="text-gray-600 text-sm">Information about your team and company structure</p>
            </div>

            <FormField label="Core Team Members" required>
              <div className="space-y-3">
                {formData.coreTeam.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleDynamicChange(e, index, 'coreTeam')}
                      className="flex-1"
                      required
                    />
                    <Input
                      type="text"
                      name="role"
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => handleDynamicChange(e, index, 'coreTeam')}
                      className="flex-1"
                      required
                    />
                    {formData.coreTeam.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDynamicField(index, 'coreTeam')}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addDynamicField('coreTeam')}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>
            </FormField>

            <FormField label="Advisors or Board Members (if any)">
              <div className="space-y-3">
                {formData.advisorsBoard.map((advisor, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={advisor.name}
                      onChange={(e) => handleDynamicChange(e, index, 'advisorsBoard')}
                      className="flex-1"
                    />
                    <Input
                      type="text"
                      name="role"
                      placeholder="Role"
                      value={advisor.role}
                      onChange={(e) => handleDynamicChange(e, index, 'advisorsBoard')}
                      className="flex-1"
                    />
                    {formData.advisorsBoard.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDynamicField(index, 'advisorsBoard')}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addDynamicField('advisorsBoard')}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Advisor/Board Member</span>
                </button>
              </div>
            </FormField>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Current Shareholder Details">
                <TextArea
                  name="shareholderDetails"
                  value={formData.shareholderDetails}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe current ownership structure"
                />
              </FormField>

              <FormField label="Governance Structure">
                <TextArea
                  name="governanceStructure"
                  value={formData.governanceStructure}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your governance structure"
                />
              </FormField>
            </div>
          </motion.div>
        );

      // Continue with other steps...
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Shariah Compliance Statement</h2>
              <p className="text-gray-600 text-sm">Ensure your business aligns with Islamic finance principles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Does your business comply with Islamic finance principles?" required>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="shariahCompliance"
                      value="Yes"
                      checked={formData.shariahCompliance === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-gray-700 text-sm">Yes, our business is Shariah-compliant</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="shariahCompliance"
                      value="No"
                      checked={formData.shariahCompliance === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">No, but we're willing to adapt</span>
                  </label>
                </div>
              </FormField>

              <FormField label="Do you already have a Shariah certificate or advisory board?">
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="hasShariahCertificate"
                      value="Yes"
                      checked={formData.hasShariahCertificate === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Yes</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="hasShariahCertificate"
                      value="No"
                      checked={formData.hasShariahCertificate === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">No</span>
                  </label>
                </div>
              </FormField>
            </div>

            {formData.hasShariahCertificate === 'Yes' && (
              <FormField label="Upload Supporting Documents">
                <FileUpload
                  name="shariahDocuments"
                  onChange={handleFileChange}
                  file={formData.shariahDocuments}
                  label="Upload Shariah compliance documents"
                />
              </FormField>
            )}
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Financial Overview</h2>
              <p className="text-gray-600 text-sm">Share your financial details and projections</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Summarize your current revenue (monthly or yearly)" required>
                <Input
                  type="text"
                  name="currentRevenue"
                  value={formData.currentRevenue}
                  onChange={handleChange}
                  placeholder="e.g., $50K MRR, $600K ARR, Pre-revenue"
                  required
                />
              </FormField>

              <FormField label="Burn rate or profitability status" required>
                <Input
                  type="text"
                  name="burnRateProfitability"
                  value={formData.burnRateProfitability}
                  onChange={handleChange}
                  placeholder="e.g., $20K monthly burn, Break-even, 20% profit margin"
                  required
                />
              </FormField>

              <FormField label="Attach financial projections (12–36 months)">
                <FileUpload
                  name="financialProjections"
                  onChange={handleFileChange}
                  file={formData.financialProjections}
                  label="Upload financial projections"
                />
              </FormField>

              <FormField label="Include your cap table if available">
                <FileUpload
                  name="capTable"
                  onChange={handleFileChange}
                  file={formData.capTable}
                  label="Upload cap table"
                />
              </FormField>
            </div>
          </motion.div>
        );

      case 8:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Legal & Intellectual Property</h2>
              <p className="text-gray-600 text-sm">Information about your legal status and IP</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Do you own or license any proprietary technology, trademarks, or patents?">
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="ownsIP"
                      value="Yes"
                      checked={formData.ownsIP === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Yes, we own intellectual property</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="ownsIP"
                      value="No"
                      checked={formData.ownsIP === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">No intellectual property</span>
                  </label>
                </div>
              </FormField>

              <FormField label="Are there any legal issues, disputes, or pending compliance matters?">
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="legalIssues"
                      value="Yes"
                      checked={formData.legalIssues === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Yes, there are legal matters</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="legalIssues"
                      value="No"
                      checked={formData.legalIssues === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">No legal issues</span>
                  </label>
                </div>
              </FormField>
            </div>

            {formData.legalIssues === 'Yes' && (
              <FormField label="Please briefly explain any legal issues:">
                <TextArea
                  name="legalExplanation"
                  value={formData.legalExplanation}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe any legal issues, disputes, or compliance matters"
                />
              </FormField>
            )}
          </motion.div>
        );

      case 9:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Funding Structure Preferences</h2>
              <p className="text-gray-600 text-sm">Tell us about your preferred funding structure</p>
            </div>

            <FormField label="What type of funding are you seeking? (Select all that apply)">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Equity',
                  'Revenue-based finance',
                  'Sukuk',
                  'Convertible note',
                  'Zakat or waqf-linked grant',
                ].map((type) => (
                  <label key={type} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="fundingTypes"
                      value={type}
                      checked={formData.fundingTypes.includes(type)}
                      onChange={handleCheckboxGroupChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700 text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </FormField>

            <FormField label="Preferred minimum ticket size">
              <Input
                type="text"
                name="preferredTicketSize"
                value={formData.preferredTicketSize}
                onChange={handleChange}
                placeholder="e.g., $100K, $500K, $1M+"
              />
            </FormField>
          </motion.div>
        );

      case 10:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Platform Engagement</h2>
              <p className="text-gray-600 text-sm">Choose how you'd like to engage with our platform</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Join Emireq roadshows</h3>
                  <p className="text-gray-600 text-sm">Participate in our investor roadshows and pitch events</p>
                </div>
                <input
                  type="checkbox"
                  name="joinRoadshows"
                  checked={formData.joinRoadshows}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Join virtual demo days</h3>
                  <p className="text-gray-600 text-sm">Showcase your product in our virtual demo events</p>
                </div>
                <input
                  type="checkbox"
                  name="joinDemoDays"
                  checked={formData.joinDemoDays}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Join our Halal incubator</h3>
                  <p className="text-gray-600 text-sm">Access mentorship and resources through our incubator program</p>
                </div>
                <input
                  type="checkbox"
                  name="joinHalalIncubator"
                  checked={formData.joinHalalIncubator}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Showcase in Sukuk marketplace</h3>
                  <p className="text-gray-600 text-sm">Feature your venture in our impact and green Sukuk marketplace</p>
                </div>
                <input
                  type="checkbox"
                  name="showcaseInMarketplace"
                  checked={formData.showcaseInMarketplace}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </label>
            </div>
          </motion.div>
        );

      case 11:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Ethical & ESG Alignment</h2>
              <p className="text-gray-600 text-sm">Tell us about your social and environmental impact</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField label="Does your venture contribute to any UN SDGs?">
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="contributesToSDGs"
                      value="Yes"
                      checked={formData.contributesToSDGs === 'Yes'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Yes, we contribute to UN SDGs</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="contributesToSDGs"
                      value="No"
                      checked={formData.contributesToSDGs === 'No'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">No direct contribution to SDGs</span>
                  </label>
                </div>
              </FormField>

              {formData.contributesToSDGs === 'Yes' && (
                <FormField label="Please list which UN SDGs:">
                  <Input
                    type="text"
                    name="sdgList"
                    value={formData.sdgList}
                    onChange={handleChange}
                    placeholder="e.g., SDG 1 (No Poverty), SDG 13 (Climate Action)"
                  />
                </FormField>
              )}
            </div>

            <FormField label="Briefly mention any social or environmental impact your project delivers">
              <TextArea
                name="socialEnvironmentalImpact"
                value={formData.socialEnvironmentalImpact}
                onChange={handleChange}
                rows="3"
                placeholder="Describe the positive social or environmental impact of your venture"
              />
            </FormField>
          </motion.div>
        );

      case 12:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Declarations</h2>
              <p className="text-gray-600 text-sm">Final agreements and confirmations</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🎉</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">Almost Done!</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    You're just one step away from completing your Emireq onboarding application. 
                    Please review and accept the declarations below to submit your application.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Information Accuracy */}
              <div className="group">
                <label className="flex items-start space-x-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-all duration-200 group-hover:shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      name="agreeTrueAccurate"
                      checked={formData.agreeTrueAccurate}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2 border-gray-300 rounded transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Information Accuracy</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I confirm that all information submitted in this application is true, accurate, 
                      and complete to the best of my knowledge.
                    </p>
                  </div>
                </label>
              </div>

              {/* Shariah Screening Consent */}
              <div className="group">
                <label className="flex items-start space-x-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-all duration-200 group-hover:shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      name="consentShariahScreening"
                      checked={formData.consentShariahScreening}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2 border-gray-300 rounded transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Shariah Screening Consent</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Required
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I consent to Emireq conducting Shariah compliance screening of our business 
                      and agree to provide additional information if required.
                    </p>
                  </div>
                </label>
              </div>

              {/* Ethical Standards Agreement */}
              <div className="group">
                <label className="flex items-start space-x-4 p-5 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer transition-all duration-200 group-hover:shadow-sm">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      name="agreeEthicalStandards"
                      checked={formData.agreeEthicalStandards}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-2 border-gray-300 rounded transition-colors"
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">Ethical Standards Agreement</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I agree to comply with Emireq's ethical standards, terms of participation, and community guidelines throughout our engagement.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 mt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">What happens next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-green-800 text-sm">Review within 5-7 business days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-green-800 text-sm">Email confirmation of submission</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-green-800 text-sm">Discovery call to discuss next steps</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      <span className="text-green-800 text-sm">Shariah compliance screening</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step {currentStep}</h2>
            <p className="text-gray-600">This step is under construction</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6"
          >
            <span className="text-white font-bold text-2xl">E</span>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emireq Onboarding Application
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the leading Islamic finance platform for startups and investors. 
            Complete your application to get started.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 lg:p-8">
            <StepIndicator />
            
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                  whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </motion.button>

                <span className="text-sm text-gray-500">
                  {currentStep} of {totalSteps} steps
                </span>

                {currentStep === totalSteps ? (
                  <motion.button
                    type="submit"
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Submit Application</span>
                    <Check className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

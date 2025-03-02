import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  GraduationCap,
  Code,
  Book,
  Database,
  GitBranch,
  Terminal,
  Briefcase,
  FileCheck,
  Upload,
  ChevronDown,
} from "lucide-react";

interface FormData {
  basicInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    resumeFile: File | null;
  };
  education: {
    universityName: string;
    degree: string;
    graduationDate: string;
    gpa: string;
    relevantCoursework: string;
  };
  workAuth: {
    legallyAuthorized: string;
    requireSponsorship: string;
    lookingFor: string;
    startDate: string;
    preferredLocations: string;
  };
  technicalSkills: {
    programmingLanguages: string;
    frameworks: string;
    databases: string;
    versionControl: string;
    openSource: string;
    agileExperience: string;
  };
  workExperience: Array<{
    companyName: string;
    role: string;
    duration: string;
    location: string;
    responsibilities: string;
  }>;
  projects: {
    proudProject: string;
    biggestChallenge: string;
  };
  behavioral: {
    aboutYourself: string;
    careerDrive: string;
    keyStrengths: string;
    workEnvironment: string;
  };
}

const initialFormData: FormData = {
  basicInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    githubUrl: "",
    resumeFile: null,
  },
  education: {
    universityName: "",
    degree: "",
    graduationDate: "",
    gpa: "",
    relevantCoursework: "",
  },
  workAuth: {
    legallyAuthorized: "",
    requireSponsorship: "",
    lookingFor: "",
    startDate: "",
    preferredLocations: "",
  },
  technicalSkills: {
    programmingLanguages: "",
    frameworks: "",
    databases: "",
    versionControl: "",
    openSource: "",
    agileExperience: "",
  },
  workExperience: [
    {
      companyName: "",
      role: "",
      duration: "",
      location: "",
      responsibilities: "",
    },
  ],
  projects: {
    proudProject: "",
    biggestChallenge: "",
  },
  behavioral: {
    aboutYourself: "",
    careerDrive: "",
    keyStrengths: "",
    workEnvironment: "",
  },
};

const ProfileSetupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expanded, setExpanded] = useState({
    basic: true,
    education: false,
    authorization: false,
    skills: false,
    experience: false,
    projects: false,
    behavioral: false,
  });
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const toggleSection = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getStepClass = (step) => {
    if (currentStep === step)
      return "bg-gradient-to-r from-rose-600 to-red-500 text-white";
    if (currentStep > step) return "bg-gray-700 text-gray-300";
    return "bg-gray-800 text-gray-400";
  };

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleWorkExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[index] = {
        ...newWorkExperience[index],
        [field]: value,
      };
      return {
        ...prev,
        workExperience: newWorkExperience,
      };
    });
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          companyName: "",
          role: "",
          duration: "",
          location: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange("basicInfo", "resumeFile", file);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle successful submission
      alert("Profile submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 bg-opacity-70 backdrop-blur-md border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-medium text-white">Profile Setup</h1>
          <button className="bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white rounded-full py-2 px-6 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200">
            Save Profile
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 justify-center items-center">
        {/* Progress Steps */}
        {/* <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 h-1 bg-gray-700 w-full -z-10 transform -translate-y-1/2"></div>
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getStepClass(
                step
              )} z-10 transition-all duration-300`}
            >
              {step}
            </button>
          ))}
        </div> */}

        <div className="w-full py-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-red-400 mb-4">
            Tell Us About Your Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The last form you'll ever fill—let our AI agent match you with the
            perfect opportunities.
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
          {/* Basic Information */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("basic")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <User className="mr-2" size={20} />
                Basic Information
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.basic ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.basic && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.basicInfo.fullName}
                      onChange={(e) =>
                        handleInputChange(
                          "basicInfo",
                          "fullName",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.basicInfo.email}
                      onChange={(e) =>
                        handleInputChange("basicInfo", "email", e.target.value)
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.basicInfo.phone}
                      onChange={(e) =>
                        handleInputChange("basicInfo", "phone", e.target.value)
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Location*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.basicInfo.location}
                      onChange={(e) =>
                        handleInputChange(
                          "basicInfo",
                          "location",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="San Francisco, CA, USA"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Linkedin size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="url"
                      value={formData.basicInfo.linkedinUrl}
                      onChange={(e) =>
                        handleInputChange(
                          "basicInfo",
                          "linkedinUrl",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    GitHub/Portfolio URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Github size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="url"
                      value={formData.basicInfo.githubUrl}
                      onChange={(e) =>
                        handleInputChange(
                          "basicInfo",
                          "githubUrl",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Resume Upload* (PDF/DOC format)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <div className="space-y-1 text-center">
                        {formData.basicInfo.resumeFile ? (
                          // Show this when file is uploaded
                          <div className="flex flex-col items-center">
                            <FileCheck
                              size={30}
                              className="mx-auto h-8 w-8 text-green-400"
                            />
                            <span className="text-sm text-gray-300 mt-2">
                              {formData.basicInfo.resumeFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleInputChange(
                                  "basicInfo",
                                  "resumeFile",
                                  null
                                )
                              }
                              className="text-sm text-rose-400 hover:text-rose-300 mt-1"
                            >
                              Remove file
                            </button>
                          </div>
                        ) : (
                          // Show this when no file is uploaded
                          <div>
                            <Upload
                              size={30}
                              className="mx-auto h-8 w-8 text-gray-400"
                            />
                            <div className="flex text-sm text-gray-400">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-rose-400 hover:text-rose-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                              >
                                <span className="px-2">Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) =>
                                    handleInputChange(
                                      "basicInfo",
                                      "resumeFile",
                                      e.target.files?.[0] || null
                                    )
                                  }
                                  required
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-400">
                              PDF or DOC up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("education")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <GraduationCap className="mr-2" size={20} />
                Education
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.education ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.education && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    University Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education.universityName}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "universityName",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="Stanford University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Degree*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.education.degree}
                    onChange={(e) =>
                      handleInputChange("education", "degree", e.target.value)
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="B.S. in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Graduation Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="date"
                      required
                      value={formData.education.graduationDate}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "graduationDate",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    GPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="3.8"
                    value={formData.education.gpa}
                    onChange={(e) =>
                      handleInputChange("education", "gpa", e.target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Relevant Coursework (optional)
                  </label>
                  <textarea
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="Data Structures, Algorithms, Machine Learning, etc."
                    rows="3"
                    value={formData.education.relevantCoursework}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "relevantCoursework",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Work Authorization & Preferences */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("authorization")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <FileCheck className="mr-2" size={20} />
                Work Authorization & Preferences
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.authorization ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.authorization && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Legally authorized to work?*
                  </label>
                  <select
                    required
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    value={formData.workAuth.legallyAuthorized}
                    onChange={(e) =>
                      handleInputChange(
                        "workAuth",
                        "legallyAuthorized",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Require sponsorship?*
                  </label>
                  <select
                    required
                    value={formData.workAuth.requireSponsorship}
                    onChange={(e) =>
                      handleInputChange(
                        "workAuth",
                        "requireSponsorship",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Looking for*
                  </label>
                  <select
                    required
                    value={formData.workAuth.lookingFor}
                    onChange={(e) =>
                      handleInputChange(
                        "workAuth",
                        "lookingFor",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                  >
                    <option value="">Select an option</option>
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-time Job</option>
                    <option value="part-time">Part-time Job</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Earliest Start Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="date"
                      value={formData.workAuth.startDate}
                      onChange={(e) =>
                        handleInputChange(
                          "workAuth",
                          "startDate",
                          e.target.value
                        )
                      }
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Job Location(s)*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.workAuth.preferredLocations}
                    onChange={(e) =>
                      handleInputChange(
                        "workAuth",
                        "preferredLocations",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="San Francisco, New York, Remote, Hybrid"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Technical Skills & Experience */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("skills")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <Code className="mr-2" size={20} />
                Technical Skills & Experience
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.skills ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.skills && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Programming Languages*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Terminal size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={formData.technicalSkills.programmingLanguages}
                      onChange={(e) =>
                        handleInputChange(
                          "technicalSkills",
                          "programmingLanguages",
                          e.target.value
                        )
                      }
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="JavaScript, Python, Java, C++, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Frameworks & Libraries
                  </label>
                  <input
                    type="text"
                    value={formData.technicalSkills.frameworks}
                    onChange={(e) =>
                      handleInputChange(
                        "technicalSkills",
                        "frameworks",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="React, TensorFlow, Django, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Databases
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Database size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={formData.technicalSkills.databases}
                      onChange={(e) =>
                        handleInputChange(
                          "technicalSkills",
                          "databases",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="MySQL, MongoDB, PostgreSQL, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Version Control Experience
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GitBranch size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={formData.technicalSkills.versionControl}
                      onChange={(e) =>
                        handleInputChange(
                          "technicalSkills",
                          "versionControl",
                          e.target.value
                        )
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                      placeholder="Git, GitHub, GitLab, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Open-source Contributions?
                  </label>
                  <select
                    value={formData.technicalSkills.openSource}
                    onChange={(e) =>
                      handleInputChange(
                        "technicalSkills",
                        "openSource",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Agile/Scrum Experience?
                  </label>
                  <select
                    value={formData.technicalSkills.agileExperience}
                    onChange={(e) =>
                      handleInputChange(
                        "technicalSkills",
                        "agileExperience",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("experience")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <Briefcase className="mr-2" size={20} />
                Work Experience
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.experience ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.experience && (
              <div className="mt-4 space-y-6">
                {formData.workExperience.map((experience, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-700 rounded-lg bg-gray-800/50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-medium text-gray-200">
                        Experience {index + 1}
                      </h3>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              workExperience: prev.workExperience.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={experience.companyName}
                          onChange={(e) =>
                            handleInputChange(
                              "workExperience",
                              "companyName",
                              e.target.value,
                              index
                            )
                          }
                          className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                          placeholder="Google"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Role/Title
                        </label>
                        <input
                          type="text"
                          value={experience.role}
                          onChange={(e) =>
                            handleInputChange(
                              "workExperience",
                              "role",
                              e.target.value,
                              index
                            )
                          }
                          className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                          placeholder="Software Engineer Intern"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={experience.duration}
                          onChange={(e) =>
                            handleInputChange(
                              "workExperience",
                              "duration",
                              e.target.value,
                              index
                            )
                          }
                          className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                          placeholder="June 2023 - August 2023"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={experience.location}
                          onChange={(e) =>
                            handleInputChange(
                              "workExperience",
                              "location",
                              e.target.value,
                              index
                            )
                          }
                          className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                          placeholder="Mountain View, CA"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Responsibilities & Achievements
                        </label>
                        <textarea
                          value={experience.responsibilities}
                          onChange={(e) =>
                            handleInputChange(
                              "workExperience",
                              "responsibilities",
                              e.target.value,
                              index
                            )
                          }
                          className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                          placeholder="Describe your responsibilities and achievements..."
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-center">
                  <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded-lg flex items-center mx-auto">
                    <span className="mr-2">+</span>Add Another Experience
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Hackathons or Coding Competitions?
                    </label>
                    <select className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200">
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Projects & Achievements */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("projects")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <Code className="mr-2" size={20} />
                Projects & Achievements
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.projects ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.projects && (
              <div className="mt-4 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Describe a technical project you're proud of*
                  </label>
                  <textarea
                    required
                    value={formData.projects.proudProject}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "proudProject",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="Describe the project, technologies used, your role, and the outcome..."
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    What was the biggest challenge you faced in a project, and
                    how did you overcome it?*
                  </label>
                  <textarea
                    required
                    value={formData.projects.biggestChallenge}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "biggestChallenge",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    placeholder="Describe a significant challenge, your approach to solving it, and what you learned..."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            )}
          </div>

          {/* Behavioral & Personal Information */}
          <div className="mb-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("behavioral")}
            >
              <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                <User className="mr-2" size={20} />
                Behavioral & Personal Information
              </h2>
              <ChevronDown
                className={`transition-transform duration-300 ${
                  expanded.behavioral ? "rotate-180" : ""
                }`}
                size={20}
              />
            </div>

            {expanded.behavioral && (
              <div className="-mt-6 space-y-6">
                <div>
                  <label className="block text- text-gray-300 mb-1">
                    Tell us about yourself*
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Describe your background, what excites you about technology,
                    what roles interest you, and the impact you hope to make.
                  </p>
                  <textarea
                    required
                    value={formData.behavioral.aboutYourself}
                    onChange={(e) =>
                      handleInputChange(
                        "behavioral",
                        "aboutYourself",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    What drives you in your career?*
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Share your career goals, what kind of work excites you, and
                    any industries or fields that interest you.
                  </p>
                  <textarea
                    required
                    value={formData.behavioral.careerDrive}
                    onChange={(e) =>
                      handleInputChange(
                        "behavioral",
                        "careerDrive",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    What are your key strengths?*
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Describe your strongest technical and soft skills, what
                    people rely on you for in a team setting, and any strengths
                    that make you stand out.
                  </p>
                  <textarea
                    required
                    value={formData.behavioral.keyStrengths}
                    onChange={(e) =>
                      handleInputChange(
                        "behavioral",
                        "keyStrengths",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    rows="4"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    What kind of work environment do you thrive in?*
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    Do you prefer startups, corporate settings, or research
                    environments? Do you like working in teams or independently?
                    Describe your ideal work setting.
                  </p>
                  <textarea
                    required
                    value={formData.behavioral.workEnvironment}
                    onChange={(e) =>
                      handleInputChange(
                        "behavioral",
                        "workEnvironment",
                        e.target.value
                      )
                    }
                    className="block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-200"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className={`py-2 px-6 rounded-full font-medium transition-all duration-200 
            ${
              currentStep > 1
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          <button
            className={`py-2 px-6 rounded-full font-medium transition-all duration-200
            ${
              currentStep < 7
                ? "bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              console.log(formData);
            }}
            disabled={currentStep === 7}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupForm;

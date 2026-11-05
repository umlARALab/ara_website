"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/utils/types';
import { useAuth } from "@/contexts/AuthContext";
import { FormattedMessage } from "react-intl";

const staticProjects: Project[] = [
    {
        id: -1,
        title: 'Voice Interfaces In Household Assistive Systems for Older Adults',
        description: 'This project presents a voice-first, multimodal interface for household assistive robots designed to support seamless and safe user-guided interactions within the physical domain. The system combines inference enabled voice interface with a GUI companion app for explicit user control and action transparency. By integrating structured processes for task confirmation and adjustment, our interface aims to improve reliability while remaining accessible to users with varying speech patterns and technological familiarity.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Bring me a glass of water (2) - timofey fayzullin.png`,
        imageAlt: 'Bring me a glass of water assistive robot interface',
        people: ['Timofey Fayzullin'],
        dateCreated: new Date('2026-09-28'),
        link: '',
    },
    {
        id: -2,
        title: 'Automatic estimation and evaluation of multi-objective human preferences for Learning from Demonstration',
        description: 'When robots are in the hands of end-users, they should perform tasks according to the preferences of those users. However, it is currently impractical to discover the preferences from those end-users without user-specific and task-specific feedback. To remedy this, we design and test an interface which can learn user preferences over time, eventually predicting their preference for the execution of any given task. Additionally, we collect data on user preferences from these interactions, aiming to find an overall preference of execution across tasks and across users. We validate several assumptions on user preference in a study (N = 10) which presents limited preference options to users. This validates our use of Pareto front options and choice of objectives in optimization. With the knowledge from this small study, we use an interface to let users explore their preference space for several unique tasks in a larger user study (N = 20). Our contributions include: (a) a novel Learning from Demonstration formulation for generating preference-aligned skill reproductions via multi-objective optimization, (b) a Graphical User Interface (GUI) for human-in-the-loop preference discovery, and (c) an analysis of inferred preferences across users and tasks. Through this analysis we find that individual users and tasks have specific preferences, but certain trends can be highlighted, like the desire for smooth and optimal robot execution.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Automatic_Tam.png`,
        imageAlt: 'Human Preference Learning approach with multiobjective data',
        people: ['Tam Nguyen, Brendan Hertel'],
        dateCreated: new Date('2026-11-04'),
        link: 'https://www.elspub.com/doi/10.55092/rl20260006',
    },
    {
        id: -3,
        title: 'Weld-PICA: Traceable and Uncertainty-Aware Human-in-the-Loop Evidence for GMAW Weld Inspection',
        description: 'End-to-end AI systems increasingly combine perception and language models to turn sensor data into human-facing assessments. Their outputs, however, are difficult to review when confidence scores are detached from source evidence, generated descriptions contain unsupported details, or uncertainty from different modules is collapsed into one value. We present Weld-PICA, a human-in-the-loop framework that converts object detections into source-linked, crop-grounded evidence records with explicit uncertainty and bounded interaction. Gas metal arc welding (GMAW) defect inspection provides the current case study, but the design applies more broadly to detection-plus-vision-language workflows in which a person retains decision authority. The offline prototype links YOLOv7 detections, padded crops, local vision-language observations, and stable finding identifiers. We describe the interaction model and a planned evaluation spanning detection, evidence grounding, and ProbVLM-style semantic uncertainty.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Weld-PICA_Varad.png`,
        imageAlt: 'Weld inspection project',
        people: ['Varad Nevasekar'],
        dateCreated: new Date('2026-11-05'),
        link: '',
    },
    {
        id: -4,
        title: 'Addressing Challenges in the Sim-To-Real Gap in Underwater Robot-To-Human Communication',
        description: 'Robots working alongside humans underwater incorporate a unique set of challenges to the broader fields of human-robot interaction and collaboration, not only related to circumstances of the environment and human safety, but also communication methods, such as capturing attention and conveying information. Prior research in virtual reality (VR) has shown that robots can perform motions as kinemes to express meaning and convey information to their human counterparts. As we move from VR towards real-world deployment, this work aims to address the sim-to-real gap when transferring the virtually tested kinemes onto a physical BlueROV2 in a pool scenario, tackling environmental challenges like fluid dynamics and drift, and mitigating effects without knowledge of absolute pose with respect to world coordinates. In several pool sessions, the scenario mimics the condition in which a diver is completing a manipulation task of closing a valve when the robot needs to interrupt that task and convey a switch in operations. This work expands our understanding of how to design autonomous robot interactions with divers in real underwater environments by enabling dynamic adjustments of robot behavior.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Pool_GlobalOverviewUnderwater - Mark de Bruijn.JPG`,
        imageAlt: 'Underwater pool overview for robot-to-human communication',
        people: ['Mark de Bruijn'],
        dateCreated: new Date('2026-09-28'),
        link: '',
    },
    {
        id: -5,
        title: 'Analyzing Gaze Behavior with an Underwater Robot in Virtual Reality during Task Execution',
        description: 'This study investigates the gaze behavior of people when they are completing a set of tasks in a simulated environment. An underwater robot uses a signal set of visual lights and kinemes to provide instructions to a person. Interruptions and sustained gaze behavior is investigated to gain a better understanding of attention when a person is interrupted by a robot while they are completing tasks.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Analyzing_Mark.png`,
        imageAlt: 'Simple 3D model of underwater environment and robot',
        people: ['Mark de Bruijn'],
        dateCreated: new Date('2026-11-05'),
        link: '',
    },
    {
        id: -6,
        title: 'Seeing Eye Stretch: Robot-assisted Indoor Navigation for Blind or Low-Vision Individuals',
        description: 'This work describes the conceptualization and implementation of an end-to-end Robot-Assisted Indoor Navigation (RAIN) system that can provide relevant feedback at appropriate moments to blind or low-vision (BLV) individuals as they move through indoor public spaces. Such a system needs to include multiple inter-connected modules: an Object Detection module, an Adaptive Navigation module , and a Visual Question Answering (VQA) module that takes multimodal input (text and image), communicating with the BLV individual through a more natural interface that can process questions while maintaining alignment with the user\'s intent and awareness.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/Seeing_Varad.gif`,
        imageAlt: 'Robot perspective of guiding a person through a hallway',
        people: ['Varad Nevasekar'],
        dateCreated: new Date('2026-11-05'),
        link: 'https://doi.org/10.1109/UR65550.2025.11078138',
    },
    {
        id: -7,
        title: 'Enhancing Legibility of Robot Actions through Simulating Robotic Movement using Augmented Reality in a Physical Space',
        description: 'This research focuses on enhancing the visualization of planning and executing robot movement in an intuitive and understandable way for humans, aiming to contribute a more coherent form of communication for human-robot interaction and bridge the gap between simulation to reality. We aim to develop a web-based interface that utilizes augmented reality (AR) for two platforms: a mobile device application and an augmented reality headset application. The goal is to provide users with comprehensible information regarding the robot’s plan and projected movements to complete typical household chores and tasks. We describe our approach of connecting an external camera device to our robotic system, implementing object detection and localization, and visualizing planned robot movements in preparation for execution through our web-based interface. Using our interface, the user is presented with overlayed information regarding the dynamic movement trajectory path that the robot plans to execute from an external point of view other than the robots to allow for more environmental awareness of its physical environment. This work has great potential impact on furthering human-robot interaction, especially in shared tasks, for domestic robots by improving robot-to-user communication.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/squareArucoDetection - Tam Nguyen.png`,
        imageAlt: 'AR visualization for robot motion plans',
        people: ['Tam Nguyen'],
        dateCreated: new Date('2026-09-28'),
        link: '',
    },
    {
        id: -8,
        title: 'CROSS-VLR: A Cross-Domain System-Level Evaluation Framework for Vision-Language Robots',
        description: 'This work introduces CROSS-VLR, a structured system-level evaluation methodology that treats these components as an interconnected system and emphasizes task-driven evaluation to trace behavior across module interactions. The methodology is retrospectively instantiated across diverse platforms and domains, including assistive navigation, industrial welding, and educational robotics. By organizing established interface-level measures around information transfer and relating them to end-to-end outcomes, CROSS-VLR supports traceable and comparable evaluation across applications. This work presents system-level evaluation as a complement to component-level and end-to-end measures for developing reliable and interpretable vision-language robotic systems.',
        imageSrc: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/img_src/CROSS-VLR_Varad.jpg`,
        imageAlt: 'Flow diagram of end-to-end system behavior',
        people: ['Varad Nevasekar'],
        dateCreated: new Date('2026-11-05'),
        link: '',
    },
];

export default function NewsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isInitialEdit, setIsInitialEdit] = useState(false); //Have to add this to fix stupid focus issue
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        image_alt: '',
        link: ''
    });

  // Wait for projects to render and scroll
  useEffect(() => {
    if (projects.length > 0) {
      // Get the hash from the browser window (i.e. the hash string after the pathname)
      const hash = window.location.hash;
      if (hash) {
        // Remove the '#' to get the ID
        const targetId = hash.slice(1);

        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [projects]);

    const editFormRef = useRef<HTMLFormElement>(null);

    
    const getProjects = async () => {
        let data: Project[] = [];

        try {
            const response = await fetch('/api/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            data = (await response.json())['data'].map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    imageSrc: item.image,
                    imageAlt: item.image_alt,
                    dateCreated: new Date(item.date_created),
                    people: item.people ?? [],
                    link: item.link
                }
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

        const projectsWithFallbacks = [
            ...data,
            ...staticProjects.filter((staticProject) =>
                !data.some((project) => project.title.trim().toLowerCase() === staticProject.title.toLowerCase())
            ),
        ].sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());

        setProjects(projectsWithFallbacks);
    };

    useEffect(() => {
        getProjects();
    }, []);

    useEffect(() => {
            if (editingProject && editFormRef.current && isInitialEdit) {
                editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                //focus to first input field
                const firstInput = editFormRef.current.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 300);
                }
                setIsInitialEdit(false); //reset flag after focus
            }
        }, [editingProject, isInitialEdit]);  


        const handleAddProject = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!newProject.title.trim() || !newProject.description.trim()) {
                alert('Title and description are required!');
                return;
            }

            const projectData = {
                ...newProject,
                image: newProject.image.trim() || '/placeholder.jpg',
                image_alt: newProject.image_alt.trim() || newProject.title,
            };

            try {
                const response = await fetch('/api/projects', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectData),
                });

                if (!response.ok) { 
                    throw new Error('Failed to add project');
                }

                //Resets form
                setNewProject({
                    title: '',
                    description: '',
                    image: '',
                    image_alt: '',
                    link: ''
                });

                //Refreshs the projects list :D
                await getProjects();
                
                alert('Project added successfully!'); 
            } catch (err: any) {
                console.error('Error adding project:', err);
                alert('Failed to add project. Please try again.'); 
            }
        };

        const handleEditProject = async (e: React.FormEvent) => {
            e.preventDefault();
            
            if (!editingProject) return;
    
            const projectData = {
                id: editingProject.id, 
                title: editingProject.title,
                description: editingProject.description,
                image: editingProject.imageSrc || '/placeholder.jpg',
                image_alt: editingProject.imageAlt || editingProject.title,
                link: editingProject.link
            };
    
            try {
                const response = await fetch('/api/projects', {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(projectData),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update project'); 
                }
    
                setEditingProject(null);
                await getProjects();
                alert('Project updated successfully!');
            } catch (err: any) {
                console.error('Error updating project:', err);
                alert('Failed to update project. Please try again.');
            }
        };
    
        const handleDeleteProject = async (id: number) => {
            if (!confirm('Are you sure you want to delete this project?')) {
                return;
            } 
    
            try {
                const response = await fetch(`/api/projects?id=${id}`, {
                    method: 'DELETE',
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete project'); 
                }
    
                await getProjects();
                alert('Project deleted successfully!');
            } catch (err: any) {
                console.error('Error deleting project:', err); 
                alert('Failed to delete project. Please try again.');
            }
        };
    
        const startEdit = (project: Project) => {
            setEditingProject({ ...project });
            setIsInitialEdit(true);//set flag when starting to edit
        };
    
        const cancelEdit = () => {
            setEditingProject(null); 
        };


    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <main className="flex-grow mt-48 flex flex-col items-center px-6 pb-20" role="main">
                <section className="w-full max-w-4xl" role="region" aria-labelledby="projects-title">
                    {/* Header Section */}
                    <div className="mb-20">
                        <h1 className="text-6xl sm:text-7xl font-black mb-6 text-slate-900 tracking-tight uppercase" id="projects-title">
                            <FormattedMessage id="project.title" />
                        </h1>
                        <div className="flex gap-3 mb-6">
                            <div className="h-3 w-40 bg-blue-600 rounded-full"></div>
                            <div className="h-3 w-20 bg-rose-500 rounded-full"></div>
                        </div>
                        <p className="text-xl text-slate-600 font-bold">
                            <FormattedMessage id="project.headline" />
                        </p>
                    </div>

                    {user && !editingProject && (
                        <form
                            onSubmit={handleAddProject}
                            className="w-full modern-card bg-white mb-16 border-l-4 border-l-blue-600 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Add New Project
                            </h2>

                            <div className="space-y-4"> 
                                <label 
                                    htmlFor="projectTitle" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="project.input.title" defaultMessage="Project Title *"/>
                                </label>
                                <input
                                    id="projectTitle"
                                    type="text"
                                    placeholder="Project Title *" 
                                    value={newProject.title} 
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, title: e.target.value }) 
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    required
                                />

                                <label 
                                    htmlFor="projectDescription" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="project.input.description" defaultMessage="Project Description *"/>
                                </label>
                                <textarea
                                    id="projectDescription"
                                    placeholder="Project Description *" 
                                    value={newProject.description}
                                    onChange={(e) => 
                                        setNewProject({ ...newProject, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-96 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                                    required
                                />

                                <label 
                                    htmlFor="projectImageLink" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="project.input.image" defaultMessage="Image URL (Google Drive Link)"/>
                                </label>
                                <input
                                    id="projectImageLink" 
                                    type="text"
                                    placeholder="Image URL (Google Drive link)"
                                    value={newProject.image} 
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, image: e.target.value })
                                    } 
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />

                                <label 
                                    htmlFor="projectImageAltText" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="project.input.altText" defaultMessage="Image Alt Text"/>
                                </label>
                                <input
                                    id="projectImageAltText" 
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={newProject.image_alt}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, image_alt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />

                                <label 
                                    htmlFor="projectLink" 
                                    className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                                >
                                    <FormattedMessage id="project.input.link" defaultMessage="Project Link"/>
                                </label>
                                <input
                                    id="projectLink"
                                    type="text"
                                    placeholder="ex: GitHub, arXiv"
                                    value={newProject.link}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, link: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                            >
                                Add Project
                            </button>
                        </form>
                    )}

                    {/*Edit the Project Form*/}
                    {user && editingProject && (
                        <form
                            ref={editFormRef} 
                            onSubmit={handleEditProject}
                            className="w-full modern-card bg-blue-50 mb-16 border-l-4 border-l-rose-500 comic-outline"
                        >
                            <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight uppercase">
                                Edit Project
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Project Title *"
                                    value={editingProject.title} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, title: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                    required
                                />

                                <textarea
                                    placeholder="Project Description *"
                                    value={editingProject.description} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, description: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white resize-none font-semibold"
                                    required
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={editingProject.imageSrc}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, imageSrc: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />

                                <input
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={editingProject.imageAlt} 
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, imageAlt: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                                <input
                                    type="text"
                                    placeholder="Project Link (ex: GitHub Link, arXiv link, etc...)"
                                    value={editingProject.link}
                                    onChange={(e) =>
                                        setEditingProject({ ...editingProject, link: e.target.value })
                                    }
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-600 bg-white font-semibold"
                                />
                            </div>

                            <div className="flex space-x-3 mt-8">
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all uppercase tracking-wide text-lg"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-8 py-4 bg-slate-500 text-white font-black rounded-lg hover:bg-slate-600 transition-all uppercase tracking-wide text-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-8">
                        { loading ? ( 
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin mb-4">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                                </div>
                                <p className="text-slate-500 italic text-lg font-bold">
                                    <FormattedMessage id="project.loading" />
                                </p>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-center py-16 pop-content">
                                <p className="text-slate-700 text-lg font-bold">
                                    <FormattedMessage id="project.none" />
                                </p>
                            </div>
                        ) : (projects.map((project) => (
                                <div key={project.id} id={project.id.toString()} className="card-lift">
                                    <ProjectCard
                                        title={project.title} 
                                        description={project.description}
                                        imageSrc={project.imageSrc}
                                        imageAlt={project.imageAlt}
                                        link={project.link}
                                        people={project.people}
                                        isEditing={Boolean(user && project.id > 0)}
                                        handlEdit={() => startEdit(project)}
                                        handleDelete={() => handleDeleteProject(project.id!)}
                                    />
                            </div>
                        )))}
                    </div>
                </section>
            </main>
        </div>  
    )
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Portfolio = () => {
  const projects = [
    {
      title: 'Selenium Automation Suite',
      description: 'Web automation and accessibility testing tool',
      technologies: ['React', 'TypeScript', 'Selenium', 'Tailwind CSS']
    },
    {
      title: 'Web Accessibility Auditor',
      description: 'Automated accessibility compliance checker',
      technologies: ['React', 'AI Integration', 'Web Scraping']
    }
  ];

  const skills = [
    'React', 
    'TypeScript', 
    'Selenium', 
    'Web Accessibility', 
    'AI Integration', 
    'Test Automation'
  ];

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Developer Portfolio</h1>
        <p className="text-muted-foreground">Showcasing web automation and testing expertise</p>
      </div>

      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-6">About Me</h2>
        <p className="text-muted-foreground">
          Passionate web automation engineer specializing in accessibility testing 
          and intelligent web solutions. Combining technical skills with a commitment 
          to creating inclusive digital experiences.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.title}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-muted-foreground">
          Interested in collaboration or have a project in mind? 
          Reach out and let's create something amazing!
        </p>
        <a 
          href="mailto:developer@example.com" 
          className="inline-block mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Contact Me
        </a>
      </section>
    </div>
  );
};

export default Portfolio;

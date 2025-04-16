
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Play, List, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useScripts } from '@/hooks/use-scripts';
import { Separator } from '@/components/ui/separator';
import RecentScans from '@/components/auditor/RecentScans';
import AccessibilityStats from '@/components/auditor/AccessibilityStats';

interface FormValues {
  url: string;
}

export default function AccessibilityAuditor() {
  const navigate = useNavigate();
  const { addScript, runScript } = useScripts();
  const [isScanning, setIsScanning] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      url: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsScanning(true);
      
      // Generate a Selenium Python script for accessibility scanning
      const scriptContent = generateAccessibilityScript(data.url);
      
      // Create a new script in our system
      const newScript = addScript(
        `Accessibility Scan - ${data.url}`,
        `Web accessibility audit for ${data.url} based on WCAG standards`,
        scriptContent
      );
      
      // Run the script
      await runScript(newScript.id);
      
      toast({
        title: "Scan Initiated",
        description: `Starting accessibility scan for ${data.url}`,
      });
      
      // Navigate to the script editor to see results
      navigate(`/editor/${newScript.id}`);
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "There was an error starting the accessibility scan",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Generate a Python script for accessibility testing
  const generateAccessibilityScript = (url: string): string => {
    return `
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import re
import json

print(f"Starting accessibility audit for {url}")
print("Initializing browser...")

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")

# Initialize the browser
driver = webdriver.Chrome(options=chrome_options)

try:
    # Load the webpage
    print(f"Navigating to {url}")
    driver.get("${url}")
    time.sleep(3)  # Wait for page to load
    
    # Get page content
    print("Analyzing page content...")
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    
    # Initialize issues list
    issues = {
        "images_without_alt": [],
        "low_contrast_elements": [],
        "heading_structure_issues": [],
        "interactive_elements_without_labels": []
    }
    
    # Check for images without alt text
    print("Checking for images without alt text...")
    images = soup.find_all('img')
    for img in images:
        if not img.get('alt'):
            issues["images_without_alt"].append({
                "element": str(img)[:100] + "...",
                "location": img.get('src', 'Unknown')
            })
    
    # Check heading structure
    print("Checking heading structure...")
    headings = soup.find_all(re.compile('^h[1-6]$'))
    heading_levels = [int(h.name[1]) for h in headings]
    
    # Check if heading levels are sequential
    for i in range(len(heading_levels) - 1):
        if heading_levels[i+1] > heading_levels[i] + 1:
            issues["heading_structure_issues"].append({
                "element": str(headings[i+1])[:100] + "...",
                "issue": f"Jump from h{heading_levels[i]} to h{heading_levels[i+1]}"
            })
    
    # Check for interactive elements without labels
    print("Checking for interactive elements without proper labels...")
    buttons = soup.find_all('button')
    inputs = soup.find_all('input')
    
    for button in buttons:
        if not button.text.strip() and not button.get('aria-label'):
            issues["interactive_elements_without_labels"].append({
                "element": str(button)[:100] + "...",
                "type": "button"
            })
    
    for input_el in inputs:
        if input_el.get('type') not in ['submit', 'button', 'image', 'hidden']:
            if not input_el.get('id') or not soup.find('label', attrs={'for': input_el.get('id')}):
                if not input_el.get('aria-label'):
                    issues["interactive_elements_without_labels"].append({
                        "element": str(input_el)[:100] + "...",
                        "type": "input"
                    })
    
    # Print summary
    total_issues = sum(len(issues[category]) for category in issues)
    print(f"\\nAudit completed. Found {total_issues} accessibility issues.")
    print(f"Images without alt text: {len(issues['images_without_alt'])}")
    print(f"Heading structure issues: {len(issues['heading_structure_issues'])}")
    print(f"Interactive elements without labels: {len(issues['interactive_elements_without_labels'])}")
    
    # Output detailed results as JSON
    print("\\nDetailed results:")
    print(json.dumps(issues, indent=2))
    
    # Calculate accessibility score (simple version)
    max_score = 100
    penalty_per_issue = 5
    score = max(0, max_score - (total_issues * penalty_per_issue))
    print(f"\\nAccessibility score: {score}/100")

except Exception as e:
    print(f"Error during accessibility audit: {str(e)}")
finally:
    # Close the browser
    driver.quit()
    print("Audit process completed.")
`;
  };

  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Web Accessibility Auditor</h1>
        <p className="text-muted-foreground">Scan websites for accessibility issues based on WCAG standards</p>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="scan" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="scan">New Scan</TabsTrigger>
          <TabsTrigger value="results">Recent Scans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Start a new accessibility scan</CardTitle>
              <CardDescription>
                Enter the URL of the website you want to audit for accessibility issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the full URL including https://
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isScanning}
                    size="lg"
                  >
                    {isScanning ? (
                      <>Scanning...</>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Accessibility Scan
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  WCAG Compliance
                </CardTitle>
                <List className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Standards</div>
                <p className="text-xs text-muted-foreground">
                  Checks against Web Content Accessibility Guidelines
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Assistance
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Smart Fixes</div>
                <p className="text-xs text-muted-foreground">
                  AI-generated suggestions for accessibility issues
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Detailed Reports
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">PDF Exports</div>
                <p className="text-xs text-muted-foreground">
                  Generate comprehensive accessibility reports
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <AccessibilityStats />
          </div>
          <RecentScans />
        </TabsContent>
      </Tabs>
    </div>
  );
}

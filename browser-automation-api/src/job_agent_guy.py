import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import threading
import asyncio
import os
import subprocess
import sys
import time
from browser_automation.agents.job_agent import JobAgent

class JobAgentApp:
    def __init__(self, root):
        self.root = root
        self.root.title("JobRight.ai Application Agent")
        self.root.geometry("650x650")
        self.root.resizable(True, True)
        
        # Chrome process
        self.chrome_process = None
        
        # Create UI elements
        self.create_widgets()
        
    def create_widgets(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding="20")
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title
        title_label = ttk.Label(main_frame, text="JobRight.ai Application Agent", font=("Helvetica", 16, "bold"))
        title_label.pack(pady=(0, 20))

        # Instructions
        instructions = (
            "This tool will automatically apply to jobs on JobRight.ai using your Google account.\n"
            "Please fill in your information below and select your resume file."
        )
        ttk.Label(main_frame, text=instructions, wraplength=600, justify=tk.CENTER).pack(pady=(0, 20))
        
        # Form frame
        form_frame = ttk.LabelFrame(main_frame, text="User Information", padding="10")
        form_frame.pack(fill=tk.X, padx=10, pady=10)
        
        # Email field
        email_frame = ttk.Frame(form_frame)
        email_frame.pack(fill=tk.X, pady=5)
        ttk.Label(email_frame, text="Google Email:", width=12).pack(side=tk.LEFT)
        self.email_var = tk.StringVar()
        ttk.Entry(email_frame, textvariable=self.email_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Password field
        password_frame = ttk.Frame(form_frame)
        password_frame.pack(fill=tk.X, pady=5)
        ttk.Label(password_frame, text="Google Password:", width=12).pack(side=tk.LEFT)
        self.password_var = tk.StringVar()
        ttk.Entry(password_frame, textvariable=self.password_var, width=40, show="*").pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Name field
        name_frame = ttk.Frame(form_frame)
        name_frame.pack(fill=tk.X, pady=5)
        ttk.Label(name_frame, text="Full Name:", width=12).pack(side=tk.LEFT)
        self.name_var = tk.StringVar()
        ttk.Entry(name_frame, textvariable=self.name_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Phone field
        phone_frame = ttk.Frame(form_frame)
        phone_frame.pack(fill=tk.X, pady=5)
        ttk.Label(phone_frame, text="Phone:", width=12).pack(side=tk.LEFT)
        self.phone_var = tk.StringVar()
        ttk.Entry(phone_frame, textvariable=self.phone_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # LinkedIn field 
        linkedin_frame = ttk.Frame(form_frame)
        linkedin_frame.pack(fill=tk.X, pady=5)
        ttk.Label(linkedin_frame, text="LinkedIn URL:", width=12).pack(side=tk.LEFT)
        self.linkedin_var = tk.StringVar()
        ttk.Entry(linkedin_frame, textvariable=self.linkedin_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Portfolio field
        portfolio_frame = ttk.Frame(form_frame)
        portfolio_frame.pack(fill=tk.X, pady=5)
        ttk.Label(portfolio_frame, text="Portfolio URL:", width=12).pack(side=tk.LEFT)
        self.portfolio_var = tk.StringVar()
        ttk.Entry(portfolio_frame, textvariable=self.portfolio_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        
        # Resume selection
        resume_frame = ttk.Frame(main_frame)
        resume_frame.pack(fill=tk.X, padx=10, pady=10)
        ttk.Label(resume_frame, text="Resume:").pack(side=tk.LEFT)
        self.resume_path_var = tk.StringVar()
        ttk.Entry(resume_frame, textvariable=self.resume_path_var, width=40).pack(side=tk.LEFT, padx=5, fill=tk.X, expand=True)
        ttk.Button(resume_frame, text="Browse", command=self.browse_resume).pack(side=tk.LEFT, padx=5)
        
        # Status display
        status_frame = ttk.LabelFrame(main_frame, text="Status", padding="10")
        status_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Scrollbar for status text
        status_scroll = ttk.Scrollbar(status_frame)
        status_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.status_text = tk.Text(status_frame, wrap=tk.WORD, height=10, yscrollcommand=status_scroll.set)
        self.status_text.pack(fill=tk.BOTH, expand=True)
        status_scroll.config(command=self.status_text.yview)
        self.status_text.config(state=tk.DISABLED)
        
        # Progress bar
        self.progress = ttk.Progressbar(main_frame, orient=tk.HORIZONTAL, length=100, mode='indeterminate')
        self.progress.pack(fill=tk.X, padx=10, pady=10)
        
        # Action buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill=tk.X, padx=10, pady=10)
        
        ttk.Button(button_frame, text="Quit", command=self.on_quit).pack(side=tk.LEFT, padx=5)
        
        self.start_button = ttk.Button(button_frame, text="Start Job Application", command=self.start_agent)
        self.start_button.pack(side=tk.RIGHT, padx=5)
        
    def update_status(self, message):
        self.status_text.config(state=tk.NORMAL)
        self.status_text.insert(tk.END, f"[{time.strftime('%H:%M:%S')}] {message}\n")
        self.status_text.see(tk.END)
        self.status_text.config(state=tk.DISABLED)
        self.root.update()
        
    def browse_resume(self):
        filename = filedialog.askopenfilename(
            title="Select Resume",
            filetypes=(("PDF files", "*.pdf"), ("Word files", "*.docx"), ("All files", "*.*"))
        )
        if filename:
            self.resume_path_var.set(filename)
            
    def start_chrome(self):
        try:
            # Try to find Chrome executable
            chrome_paths = [
                r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                # Add more common paths if needed
            ]
            
            chrome_exe = None
            for path in chrome_paths:
                if os.path.exists(path):
                    chrome_exe = path
                    break
                    
            if not chrome_exe:
                self.update_status("Chrome not found. Please install Google Chrome.")
                return False
                
            # Create a temporary profile directory
            temp_profile = os.path.join(os.environ.get('TEMP', os.getcwd()), "chrome-job-agent")
            os.makedirs(temp_profile, exist_ok=True)
            
            # Start Chrome with a clean profile but without CDP
            self.update_status("Starting Chrome...")
            cmd = [chrome_exe, f"--user-data-dir={temp_profile}"]
            self.chrome_process = subprocess.Popen(cmd)
            
            # Wait a bit for Chrome to start
            self.update_status("Waiting for Chrome to start...")
            time.sleep(2)  # Wait 2 seconds
            
            return True
            
        except Exception as e:
            self.update_status(f"Error starting Chrome: {str(e)}")
            return False
            
    def start_agent(self):
        # Disable start button
        self.start_button.config(state=tk.DISABLED)
        
        # Validate required inputs
        if not self.email_var.get() or not self.password_var.get() or not self.resume_path_var.get():
            messagebox.showerror("Missing Information", "Please provide your Google email, password, and resume")
            self.start_button.config(state=tk.NORMAL)
            return
            
        # Start progress bar
        self.progress.start()
        
        # Create a separate thread for the agent
        threading.Thread(target=self._run_agent_thread, daemon=True).start()
        
    def _run_agent_thread(self):
        try:
            # Start Chrome
            if not self.start_chrome():
                self.update_status("Could not start Chrome. Process aborted.")
                self.root.after(0, lambda: self.progress.stop())
                self.root.after(0, lambda: self.start_button.config(state=tk.NORMAL))
                return
            
            # Gather user data
            sensitive_data = {
                "email": self.email_var.get(),
                "password": self.password_var.get(),
                "name": self.name_var.get(),
                "phone": self.phone_var.get(),
                "linkedin": self.linkedin_var.get(),
                "portfolio": self.portfolio_var.get()
            }
            
            resume_path = self.resume_path_var.get()
            
            # Update status
            self.update_status("Starting job application process...")
            
            # Run the agent asynchronously
            async def run_agent():
                job_agent = JobAgent(
                    sensitive_data=sensitive_data,
                    resume_path=resume_path
                    # No CDP host and port parameters
                )
                result = await job_agent.run()
                return result
            
            # Create new event loop for the thread
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            
            # Run the agent and get the result
            result = loop.run_until_complete(run_agent())
            
            # Process result
            if result["status"] == "success":
                self.update_status("Job application completed successfully!")
                self.update_status(str(result["result"]))
                messagebox.showinfo("Success", "Job application process completed!")
            else:
                self.update_status(f"Error during job application: {result.get('details', 'Unknown error')}")
                messagebox.showerror("Error", f"Job application failed: {result.get('details', 'Unknown error')}")
                
        except Exception as e:
            self.update_status(f"Error: {str(e)}")
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
            
        finally:
            # Stop progress bar and enable start button
            self.root.after(0, lambda: self.progress.stop())
            self.root.after(0, lambda: self.start_button.config(state=tk.NORMAL))
            
    def on_quit(self):
        # Close Chrome if it's running
        if self.chrome_process:
            try:
                self.chrome_process.terminate()
                self.update_status("Chrome closed.")
            except:
                pass
        self.root.destroy()

if __name__ == "__main__":
    # Set up exception handling
    def show_error(exc_type, exc_value, exc_traceback):
        error_msg = ''.join(traceback.format_exception(exc_type, exc_value, exc_traceback))
        messagebox.showerror('Error', f'An unexpected error occurred:\n{error_msg}')
    
    # Import traceback here to avoid unused import if not needed
    import traceback
    sys.excepthook = show_error
    
    root = tk.Tk()
    app = JobAgentApp(root)
    root.protocol("WM_DELETE_WINDOW", app.on_quit)  # Handle window close properly
    root.mainloop()
import { UploadCloud, File, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProposalSubmission() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Project Proposal Submission</h1>
        <p className="text-slate-500 mt-1">Submit your finalized proposal document for supervisor review.</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-blue-900">Submission Guidelines</h4>
          <p className="text-sm text-blue-700 mt-1">
            Please ensure your document follows the university's IEEE format guidelines. 
            Only <span className="font-semibold">.PDF</span> files under 10MB are accepted. Maximum 2 submissions allowed before the deadline.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <form className="space-y-6">
            
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Project Title</label>
                <input 
                  type="text" 
                  defaultValue="Automated Healthcare Diagnosis Using Deep Learning"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm text-slate-800 font-medium"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Supervisor</label>
                <input 
                  type="text" 
                  defaultValue="Dr. Alan Turing"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm text-slate-800 font-medium cursor-not-allowed"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Remarks (Optional)</label>
              <textarea 
                rows="3" 
                placeholder="Any notes for your supervisor regarding this version..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none text-sm transition-all"
              ></textarea>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500">PDF, DOCX (Max 10MB)</p>
              </div>
            </div>

            {/* Simulated Attached File (To show what it looks like after upload) */}
            <div className="flex items-center p-3 bg-white border border-emerald-200 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-rose-50 rounded flex items-center justify-center mr-3">
                <File className="w-5 h-5 text-rose-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Proposal_Final_Draft_v2.pdf</p>
                <p className="text-xs text-slate-500">2.4 MB</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
            </div>

          </form>
        </div>

        {/* Form Actions Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end space-x-3">
          <button className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center">
            Submit Proposal
          </button>
        </div>
      </div>

    </div>
  );
}
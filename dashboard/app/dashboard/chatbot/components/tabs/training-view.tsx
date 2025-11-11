"use client"

import { Search, Upload, X } from "lucide-react"
import { useState, useCallback } from "react"

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'doc', 'csv', 'xlsx', 'xls', 'txt'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain'
];

type FileWithPreview = File & {
  preview: string;
  id: string;
};

const FileIcon = ({ extension }: { extension?: string }) => {
  const getIcon = () => {
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'doc':
        return '📝';
      case 'csv':
      case 'xlsx':
      case 'xls':
        return '📊';
      case 'txt':
        return '📄';
      default:
        return '📁';
    }
  };

  return <span className="text-lg">{getIcon()}</span>;
};

export function TrainingView() {
  const [activeTab, setActiveTab] = useState<"knowledge" | "manual">("knowledge")
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const validateFile = (file: File): { valid: boolean; message?: string } => {
    // Vérifier la taille du fichier (max 10 Mo)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        message: `Le fichier ${file.name} dépasse la taille maximale de ${MAX_FILE_SIZE_MB} Mo`
      };
    }

    // Vérifier l'extension du fichier
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return {
        valid: false,
        message: `Le type de fichier .${fileExtension} n'est pas pris en charge`
      };
    }

    // Vérifier le type MIME
    if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.type.startsWith('text/')) {
      return {
        valid: false,
        message: `Le type de fichier ${file.type} n'est pas autorisé`
      };
    }

    return { valid: true };
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles: FileWithPreview[] = [];
      const invalidFiles: string[] = [];

      Array.from(e.dataTransfer.files).forEach(file => {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
          }));
        } else if (validation.message) {
          invalidFiles.push(validation.message);
        }
      });

      setFiles(prevFiles => [...prevFiles, ...validFiles]);

      if (invalidFiles.length > 0) {
        invalidFiles.forEach(message => {
          alert(message)
        });
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles: FileWithPreview[] = [];
      const invalidFiles: string[] = [];

      Array.from(e.target.files).forEach(file => {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
          }));
        } else if (validation.message) {
          invalidFiles.push(validation.message);
        }
      });

      setFiles(prevFiles => [...prevFiles, ...validFiles]);

      if (invalidFiles.length > 0) {
        invalidFiles.forEach(message => {
          alert(message)
        });
      }
      
      // Réinitialiser la valeur pour permettre la sélection du même fichier à nouveau
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className="flex gap-6 p-6 h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Training Data</h1>
          <p className="text-muted-foreground">
            Just upload document file or add a link to website, to train this AI Agent with your own data
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "knowledge"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Knowledge Base
          </button>
        </div>

        {activeTab === "knowledge" && (
          <div className="space-y-4">
            {/* Sub-tabs */}
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                Upload File
              </button>
            </div>

            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-foreground font-medium">
                    Glissez-déposez vos fichiers ici ou 
                    <label className="text-primary hover:underline cursor-pointer">
                      <span>parcourez</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.doc,.csv,.xlsx,.xls,.txt"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Formats acceptés : .pdf, .docx, .doc, .csv, .xlsx, .xls, .txt (max ${MAX_FILE_SIZE_MB} Mo par fichier)
                  </p>
                </div>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="space-y-2 mt-4">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileIcon extension={file.name.split('.').pop()} />
                        <div className="max-w-[200px] truncate">
                          <p className="text-sm font-medium text-foreground truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setFiles(files.filter(f => f.id !== file.id))
                          // Libérer l'URL de l'objet pour éviter les fuites de mémoire
                          if (file.preview) {
                            URL.revokeObjectURL(file.preview);
                          }
                        }}
                        className="text-muted-foreground hover:text-foreground p-1 -mr-2"
                        aria-label="Supprimer le fichier"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">Knowledge Base Storage Used: 0 B / 2.56 MB</p>
          </div>
        )}

        {activeTab === "manual" && (
          <div className="space-y-4">
            <p className="text-muted-foreground">Manual data entry options would go here</p>
          </div>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type props={
    record:SessionDetail
}

function ViewReportDialog({record}:props) {
  const report = record.report as any; // Cast to access report properties
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'link'} size={'sm'}>View Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className='text-center text-2xl font-bold text-blue-600 mb-6'>Medical Consultation Report</h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className='space-y-6'>
              
              {/* Session Information */}
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h2 className='font-bold text-blue-600 text-lg mb-3'>Session Information</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  <div>
                    <span className='font-semibold'>Session ID: </span>
                    <span className='text-gray-700'>{record.sessionId}</span>
                  </div>
                  <div>
                    <span className='font-semibold'>Consultation Date: </span>
                    <span className='text-gray-700'>{moment(new Date(record.createdOn)).format('MMMM Do YYYY, h:mm A')}</span>
                  </div>
                  <div>
                    <span className='font-semibold'>Doctor Specialization: </span>
                    <span className='text-gray-700'>{record.selectedDoctor.specialist}</span>
                  </div>
                  <div>
                    <span className='font-semibold'>Patient: </span>
                    <span className='text-gray-700'>{report?.user || 'Anonymous'}</span>
                  </div>
                </div>
              </div>

              {/* Chief Complaint */}
              <div className='bg-red-50 p-4 rounded-lg'>
                <h2 className='font-bold text-red-600 text-lg mb-3'>Chief Complaint</h2>
                <p className='text-gray-700 leading-relaxed'>
                  {report?.chiefComplaint || report?.['chief Complaint'] || 'Not specified'}
                </p>
              </div>

              {/* Summary */}
              <div className='bg-green-50 p-4 rounded-lg'>
                <h2 className='font-bold text-green-600 text-lg mb-3'>Consultation Summary</h2>
                <p className='text-gray-700 leading-relaxed'>
                  {report?.summary || 'No summary available'}
                </p>
              </div>

              {/* Symptoms & Clinical Details */}
              <div className='bg-yellow-50 p-4 rounded-lg'>
                <h2 className='font-bold text-yellow-600 text-lg mb-3'>Clinical Details</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  
                  {/* Symptoms */}
                  <div>
                    <h3 className='font-semibold text-gray-800 mb-2'>Symptoms:</h3>
                    {report?.symptoms && Array.isArray(report.symptoms) ? (
                      <ul className='list-disc list-inside space-y-1'>
                        {report.symptoms.map((symptom: string, index: number) => (
                          <li key={index} className='text-gray-700 text-sm'>{symptom}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-gray-500 text-sm'>No symptoms recorded</p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <h3 className='font-semibold text-gray-800 mb-2'>Duration:</h3>
                    <p className='text-gray-700 text-sm'>
                      {report?.duration || 'Not specified'}
                    </p>
                  </div>

                  {/* Severity */}
                  <div>
                    <h3 className='font-semibold text-gray-800 mb-2'>Severity:</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      report?.severity === 'severe' ? 'bg-red-100 text-red-800' :
                      report?.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      report?.severity === 'mild' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report?.severity || 'Not assessed'}
                    </span>
                  </div>
                </div>
              </div>

            {/* Medications Mentioned */}
              {report?.medicationsMentioned && report.medicationsMentioned.length > 0 && (
                <div className='bg-purple-50 p-4 rounded-lg'>
                  <h2 className='font-bold text-purple-600 text-lg mb-3'>Medications Mentioned</h2>
                  <ul className='list-disc list-inside space-y-1'>
                    {report.medicationsMentioned.map((medication: string, index: number) => (
                      <li key={index} className='text-gray-700'>{medication}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* AI Recommendations */}
              <div className='bg-indigo-50 p-4 rounded-lg'>
                <h2 className='font-bold text-indigo-600 text-lg mb-3'>Recommendations</h2>
                {report?.recommendations && Array.isArray(report.recommendations) ? (
                  <ul className='list-disc list-inside space-y-2'>
                    {report.recommendations.map((recommendation: string, index: number) => (
                      <li key={index} className='text-gray-700'>{recommendation}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500'>No recommendations provided</p>
                )}
              </div>
              {/* Initial Notes */}
              {record.notes && (
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <h2 className='font-bold text-gray-600 text-lg mb-3'>Initial Patient Notes</h2>
                  <p className='text-gray-700 leading-relaxed'>{record.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className='text-center text-sm text-gray-500 pt-4 border-t'>
                <p>This report was generated by AI Medical Voice Agent</p>
                <p>Generated on: {moment().format('MMMM Do YYYY, h:mm A')}</p>
              </div>

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog
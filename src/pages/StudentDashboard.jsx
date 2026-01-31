import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ExternalLink, Trophy, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const StudentDashboard = () => {
    const { students } = useApp();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg">
                    <CardContent className="pt-6 relative overflow-hidden">
                        <div className="text-indigo-100 font-medium z-10 relative">Total Competitions</div>
                        <div className="text-4xl font-bold mt-2 z-10 relative">{students.length}</div>
                        <Trophy className="absolute right-4 bottom-4 h-16 w-16 text-white opacity-10" />
                    </CardContent>
                 </Card>
                 <Card className="border-l-4 border-l-amber-500">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                             <div>
                                <div className="text-slate-500 font-medium">Pending Approvals</div>
                                <div className="text-4xl font-bold mt-2 text-slate-900">{students.filter(s => s.status === 'Pending').length}</div>
                             </div>
                             <Clock className="h-8 w-8 text-amber-500 opacity-80" />
                        </div>
                    </CardContent>
                 </Card>
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mt-8">My Registrations</h2>
            <div className="grid gap-4">
                {students.map((student) => (
                    <Card key={student.id} className="transition-shadow hover:shadow-md">
                        <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                            <div>
                                <h3 className="font-semibold text-lg text-slate-900">{student.competition}</h3>
                                <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-2 items-center">
                                    <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{student.grade}th Grade</span>
                                    <span>•</span>
                                    <span>Stage: <span className="font-medium text-slate-700">{student.stage}</span></span>
                                    <span>•</span>
                                    <span>Type: {student.type}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex gap-2">
                                     <Badge variant={
                                        student.status === 'Approved' ? 'success' :
                                        student.status === 'Rejected' ? 'destructive' : 'warning'
                                    }>
                                        {student.status}
                                    </Badge>
                                    {student.result !== '-' && (
                                        <Badge variant={student.result === 'Passed' ? 'success' : 'destructive'}>
                                            {student.result}
                                        </Badge>
                                    )}
                                </div>
                                {student.status === 'Approved' && (
                                    <Button variant="link" size="sm" className="h-auto p-0 text-primary-600">
                                        View Details <ExternalLink className="ml-1 h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;

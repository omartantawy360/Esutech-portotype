import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardTitle, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Users, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const AdminDashboard = () => {
    const { students, competitions, updateStudentStatus, updateStudentStage, setStudentResult } = useApp();
    const [filterGrade, setFilterGrade] = useState('');
    const [filterCompetition, setFilterCompetition] = useState('');
    const [filterResult, setFilterResult] = useState('');

    const filteredStudents = students.filter(s => {
        return (
            (!filterGrade || s.grade === filterGrade) &&
            (!filterCompetition || s.competition === filterCompetition) &&
            (!filterResult || (filterResult === 'Passed' && s.result === 'Passed') || (filterResult === 'Failed' && s.result === 'Failed'))
        );
    });

    const stats = [
        { title: 'Total Students', value: students.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Competitions', value: competitions.length, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: 'Passed Students', value: students.filter(s => s.result === 'Passed').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { title: 'Failed Students', value: students.filter(s => s.result === 'Failed').length, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-full", stat.bg, stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <select
                            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                            value={filterCompetition}
                            onChange={(e) => setFilterCompetition(e.target.value)}
                        >
                            <option value="">All Competitions</option>
                            {competitions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                            value={filterGrade}
                            onChange={(e) => setFilterGrade(e.target.value)}
                        >
                            <option value="">All Grades</option>
                            {[9, 10, 11, 12].map(g => <option key={g} value={String(g)}>{g}th Grade</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                            value={filterResult}
                            onChange={(e) => setFilterResult(e.target.value)}
                        >
                            <option value="">All Results</option>
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg">Registered Students</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Competition</th>
                                <th className="px-6 py-3">Stage</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Result</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No students found</td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => {
                                    const competition = competitions.find(c => c.name === student.competition);
                                    return (
                                        <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {student.name}
                                                <div className="text-xs text-slate-500 font-normal">{student.grade}th Grade • Class {student.clazz}</div>
                                            </td>
                                            <td className="px-6 py-4">{student.competition}</td>
                                            <td className="px-6 py-4">
                                                {competition && (
                                                    <select
                                                        className="rounded border border-slate-200 bg-white text-xs py-1 pl-2 pr-6 focus:ring-1 focus:ring-primary-500"
                                                        value={student.stage}
                                                        onChange={(e) => updateStudentStage(student.id, e.target.value)}
                                                    >
                                                        {competition.stages.map(stage => (
                                                            <option key={stage} value={stage}>{stage}</option>
                                                        ))}
                                                        <option value="Registration">Registration</option>
                                                    </select>
                                                )}
                                                {!competition && <span>{student.stage}</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={
                                                    student.status === 'Approved' ? 'success' :
                                                    student.status === 'Rejected' ? 'destructive' : 'warning'
                                                }>
                                                    {student.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "font-medium",
                                                    student.result === 'Passed' ? 'text-emerald-600' :
                                                    student.result === 'Failed' ? 'text-red-600' : 'text-slate-400'
                                                )}>
                                                    {student.result}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    {student.status === 'Pending' && (
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="ghost" className="h-6 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => updateStudentStatus(student.id, 'Approved')}>Approve</Button>
                                                            <Button size="sm" variant="ghost" className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => updateStudentStatus(student.id, 'Rejected')}>Reject</Button>
                                                        </div>
                                                    )}
                                                    {student.status === 'Approved' && (
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="ghost" className="h-6 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" onClick={() => setStudentResult(student.id, 'Passed')}>Pass</Button>
                                                            <Button size="sm" variant="ghost" className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setStudentResult(student.id, 'Failed')}>Fail</Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;

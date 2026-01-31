import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Register = () => {
    const { competitions, registerStudent } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        clazz: '', 
        competition: competitions[0]?.name || '',
        type: 'Individual',
        members: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerStudent(formData);
        navigate('/student');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Register for Competition</h1>
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Grade</label>
                                <div className="relative">
                                    <select
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        className="w-full flex h-10 items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                        required
                                    >
                                        <option value="">Select Grade</option>
                                        {[9, 10, 11, 12].map(g => <option key={g} value={g}>{g}th Grade</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                            <Input
                                label="Class (e.g. A, B)"
                                name="clazz"
                                value={formData.clazz}
                                onChange={handleChange}
                                required
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Competition</label>
                                <div className="relative">
                                    <select
                                        name="competition"
                                        value={formData.competition}
                                        onChange={handleChange}
                                        className="w-full flex h-10 items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                    >
                                        {competitions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Participation Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Individual"
                                        checked={formData.type === 'Individual'}
                                        onChange={handleChange}
                                        className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                    />
                                    Individual
                                </label>
                                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="Team"
                                        checked={formData.type === 'Team'}
                                        onChange={handleChange}
                                        className="text-primary-600 focus:ring-primary-500 h-4 w-4"
                                    />
                                    Team
                                </label>
                            </div>
                        </div>

                        {formData.type === 'Team' && (
                            <Input
                                label="Team Members (comma separated)"
                                name="members"
                                value={formData.members}
                                onChange={handleChange}
                                placeholder="e.g. John Doe, Jane Smith"
                                required
                            />
                        )}

                        <div className="flex justify-end pt-4">
                            <Button type="submit" size="lg">Submit Registration</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
export default Register;

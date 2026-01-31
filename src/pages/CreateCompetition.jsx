import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Plus, Trash2 } from 'lucide-react';

const CreateCompetition = () => {
    const { addCompetition } = useApp();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [stages, setStages] = useState(['Registration', 'Final']);

    const handleAddStage = () => {
        const newStages = [...stages];
        newStages.splice(stages.length - 1, 0, 'New Stage');
        setStages(newStages);
    };

    const handleRemoveStage = (index) => {
        if (stages.length <= 2) return; // Keep Registration and Final
        const newStages = stages.filter((_, i) => i !== index);
        setStages(newStages);
    };

    const handleStageChange = (index, value) => {
        const newStages = [...stages];
        newStages[index] = value;
        setStages(newStages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCompetition({ name, stages: stages.filter(s => s !== 'Registration') }); // Registration is implied/handled specially
        navigate('/admin');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Create New Competition</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Competition Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <Input
                                label="Competition Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Physics Olympiad"
                                required
                            />
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Stages</label>
                                <div className="space-y-2">
                                    {stages.map((stage, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={stage}
                                                onChange={(e) => handleStageChange(index, e.target.value)}
                                                readOnly={index === 0 || index === stages.length - 1} // Lock first and last
                                                className={index === 0 || index === stages.length - 1 ? 'bg-slate-100 text-slate-500' : ''}
                                            />
                                            {index !== 0 && index !== stages.length - 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleRemoveStage(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="mt-2"
                                    onClick={handleAddStage}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Intermediate Stage
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit">Create Competition</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateCompetition;

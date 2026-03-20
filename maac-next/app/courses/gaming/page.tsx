import CourseTemplate from '@/components/CourseTemplate';

export default function GamingPage() {
    return (
        <CourseTemplate 
            title="GAME DESIGN"
            description="Build interactive worlds. Focus on Real-time rendering, asset creation, and level design for AAA games."
            roles={['Game Developer', 'Level Designer', 'Environment Artist', 'Game Tester']}
            focusAreas={['Unreal Engine / Unity Basics', 'Real-time Rendering', 'Asset Pipeline', 'Interactive Level Design']}
        />
    );
}

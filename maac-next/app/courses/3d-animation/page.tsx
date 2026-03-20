import CourseTemplate from '@/components/CourseTemplate';

export default function AnimationPage() {
    return (
        <CourseTemplate 
            title="AD3D EDGE PLUS"
            description="Dive into the world of 3D Animation. Focus on high-end modeling, rigging, and character animation."
            roles={['3D Animator', 'Character Designer', 'Lighting Artist', 'Rigging Artist']}
            focusAreas={['Character Modeling', 'Rigging & Animation', 'Lighting & Texturing', 'Storyboarding']}
        />
    );
}

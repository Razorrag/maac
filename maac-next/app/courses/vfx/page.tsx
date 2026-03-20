import CourseTemplate from '@/components/CourseTemplate';

export default function VFXPage() {
    return (
        <CourseTemplate 
            title="ADVFX PLUS"
            description="Master the art of Visual Effects. Learn cutting-edge CGI, Compositing, and Motion Tracking used in Hollywood blockbusters."
            roles={['VFX Compositor', 'FX Artist', 'Roto Artist', 'Matchmove Artist']}
            focusAreas={['CGI & 3D Basics', 'Advanced Compositing', 'Motion Tracking', 'Digital Environment Creation']}
        />
    );
}

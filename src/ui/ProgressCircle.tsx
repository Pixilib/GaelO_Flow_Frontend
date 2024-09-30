type ProgressCircleProps = {
    progress: number; // Valeur entre 0 et 100
    text?: string; // Texte affiché au centre (par défaut 'mph')
    size?: number; // Taille de la jauge (par défaut 150px)
};

const ProgressCircle = ({ progress, text = 'mph', size = 150 }: ProgressCircleProps) => {
    const radius = 16; // Rayon fixe pour une vue SVG 36x36
    const circumference = 2 * Math.PI * radius;
    const progressValue = (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                className="rotate-[135deg] w-full h-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Cercle d'arrière-plan */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-primary dark:text-neutral-700"
                    strokeWidth="2"
                    strokeDasharray="75 100" // Arrière-plan avec 75% de l'arc complet
                />

                {/* Cercle de progression */}
                <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    className="stroke-current text-primary dark:text-primary"
                    strokeWidth="2"
                    strokeDasharray={`${progressValue} ${circumference}`}
                />
            </svg>

            {/* Texte au centre */}
            <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <span className="text-4xl font-bold text-primary dark:text-primary">
                    {progress}
                </span>
                <span className="block text-primary dark:text-primary">{text}</span>
            </div>
        </div>
    );
};

export default ProgressCircle;

import React from 'react';

const BoardGameGroup = ({ title, games }) => {
    return (
        <div className="border p-4 rounded-xl" style={{ borderColor: 'var(--color-orange)' }}>
            <h3 className="text-[var(--color-orange)] font-semibold mb-2">{title}</h3>
            <input
                type="text"
                placeholder="Αναζήτηση Επιτραπέζιου"
                className="w-full mb-3 p-1 border rounded"
            />
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {games.map((game, index) => (
                    <div
                        key={index}
                        className="bg-[var(--color-gray-purple)] text-white p-2 rounded w-24 text-center"
                    >
                        {game}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardGameGroup;

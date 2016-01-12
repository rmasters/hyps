let tick = (name, startTime, intervalHours) => {
    return {
        name: name,
        startTime: (startTime[0] * 3600) + (startTime[1] * 60) + startTime[2],
        interval: 3600 * intervalHours
    };
};

export default {
    round: 6,
    ticks: [
        tick('Rankings', [3, 41, 0], 24),
        tick('Control', [0, 26, 0], 1),
        tick('Fleet Movements', [0, 26, 0], 1),
        tick('Energy', [0, 18, 0], 1),
        tick('Infiltration', [0, 19, 0], 1),
        tick('Research', [0, 19, 0], 1),
        tick('Battle', [0, 6, 0], 2),
        tick('N/A', [0, 6, 0], 1),
        tick('Production', [0, 24, 0], 1),
        tick('Cash', [0, 6, 0], 8),
        tick('Planet', [3, 23, 0], 8)
    ]
};


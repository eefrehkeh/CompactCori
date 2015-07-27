#!/usr/bin/python
"""Global parameters"""

num_particles = None
simulation_height = 1000
simulation_width = 1000
simulation_depth = 1000
dt = None
num_active_workers = None
partitions = {}
max_radius = min(simulation_width, simulation_height, simulation_depth)/32

comm = None
rank = None
num_threads = None

def determine_particle_thread_num(x_position):
    return math.ceil((x_position/simulation_width)*num_active_workers)

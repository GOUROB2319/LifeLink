import re

def get_bounds(svg_content):
    # Find all path data
    paths = re.findall(r' d="([^"]+)"', svg_content)
    
    all_points_x = []
    all_points_y = []
    
    for path in paths:
        # Extract all numbers (including negatives and decimals)
        numbers = re.findall(r'[-+]?\d*\.\d+|\d+', path)
        floats = [float(n) for n in numbers]
        
        # This is a very rough approximation as it doesn't account for 
        # absolute vs relative coordinates correctly for all commands,
        # but for this specific SVG's structure (mostly absolute or large values),
        # it might give us a good hint.
        # Let's try to be a bit smarter.
        
        # Split by command letters
        commands = re.split(r'([a-zA-Z])', path)
        current_x = 0
        current_y = 0
        
        i = 1
        while i < len(commands):
            cmd = commands[i]
            data = commands[i+1]
            nums = [float(n) for n in re.findall(r'[-+]?\d*\.\d+|\d+', data)]
            
            if cmd == 'M' or cmd == 'L':
                for j in range(0, len(nums), 2):
                    current_x = nums[j]
                    current_y = nums[j+1]
                    all_points_x.append(current_x)
                    all_points_y.append(current_y)
            elif cmd == 'm' or cmd == 'l':
                for j in range(0, len(nums), 2):
                    current_x += nums[j]
                    current_y += nums[j+1]
                    all_points_x.append(current_x)
                    all_points_y.append(current_y)
            elif cmd == 'C':
                for j in range(0, len(nums), 6):
                    # We add control points too for a safe bound
                    all_points_x.extend([nums[j], nums[j+2], nums[j+4]])
                    all_points_y.extend([nums[j+1], nums[j+3], nums[j+5]])
                    current_x = nums[j+4]
                    current_y = nums[j+5]
            elif cmd == 'c':
                for j in range(0, len(nums), 6):
                    all_points_x.extend([current_x + nums[j], current_x + nums[j+2], current_x + nums[j+4]])
                    all_points_y.extend([current_y + nums[j+1], current_y + nums[j+3], current_y + nums[j+5]])
                    current_x += nums[j+4]
                    current_y += nums[j+5]
            elif cmd == 'H':
                for x in nums:
                    current_x = x
                    all_points_x.append(current_x)
            elif cmd == 'h':
                for dx in nums:
                    current_x += dx
                    all_points_x.append(current_x)
            elif cmd == 'V':
                for y in nums:
                    current_y = y
                    all_points_y.append(current_y)
            elif cmd == 'v':
                for dy in nums:
                    current_y += dy
                    all_points_y.append(current_y)
            
            i += 2

    if not all_points_x:
        return None
        
    return min(all_points_x), min(all_points_y), max(all_points_x), max(all_points_y)

with open(r'c:\Users\GourobSaha\OneDrive - Gourob Saha\LifeLink\assets\images\LifeLink BD Logo.svg', 'r') as f:
    content = f.read()
    bounds = get_bounds(content)
    print(f"MinX: {bounds[0]}, MinY: {bounds[1]}, MaxX: {bounds[2]}, MaxY: {bounds[3]}")
    print(f"Width: {bounds[2]-bounds[0]}, Height: {bounds[3]-bounds[1]}")

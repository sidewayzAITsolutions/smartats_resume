export async function getAISkillSuggestions(prompt: string, resumeSkills: string[]) {
        const openaiResponse = await fetch('/api/openai/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });
        if (!openaiResponse.ok) {
          throw new Error('Failed to get AI skill suggestions');
        }
        const { result } = await openaiResponse.json();
        const response = result;
        
        const skillsArray = response
          .split(',')
          .map((skill: string) => skill.trim())
          .filter((skill: string) => skill.length > 0 && !resumeSkills.includes(skill)); // Use resumeSkills instead of resumeData.skills
    
        return skillsArray;
      }
      
      export {}

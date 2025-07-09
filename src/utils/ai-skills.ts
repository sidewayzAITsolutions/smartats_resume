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
        .filter((skill: string) => skill.length > 0 && !resumeData.skills.includes(skill)); // TODO: Use this variable
